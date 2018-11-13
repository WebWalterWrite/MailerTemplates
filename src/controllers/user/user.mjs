import { userPwdForgot } from "../../services/mail/sendmail/sendmail";
import { findUser } from "../../models/querying/userQuery";
import { createEmailToken } from "../../models/querying/tokenQuery";
import { token } from "../../services/crypt/token";
import { isValidEmail } from "../../services/validation/validation";

/**
  @desc Renvoi un email suite à une demande de réinitialisation de mot de passe
  @func pwdForgot -  traite le formulaire 'mot de passe oublié'
  @func isValidEmail - vérifie que le format email est valide
  @func HashPwd - Crypter le mot de passe
  @func token - créer un token à joindre en paramêtre url
  @func userPwdForgot - envoyer mail de réinitialisation de mot de passe
  @param {object} req.body - contient l'adresse email
  @param {string} user - parametre de la fonction find user
  @param {string} email -parametre de la fonction WelcomeUser
  @param {string} key - parametre de la fonction token
*/
export const pwdForgot = async (req, res) => {
	try {
		/*
vérifier le champ email
*/

		let msg = {
			unknow: "une erreur s'est produite, veuillez renouveller votre demande",
            email: "L'adresse email n'a pas été trouvée",
            sucess: "Un email vient de vous être envoyé"
		};

		let { email } = req.body;
		let isValid = await isValidEmail(email, "email");

		// Vérifier si il y a une erreur
		if (isValid) return res.json(isValid);

		/*
 Rechercher user en bdd
*/

		const ifUser = await findUser(email, "email", "firstname");

		// vérifier si l'émail existe en bdd
		if (!ifUser) return res.json({ error: msg.email });

		// Générer un token
		let key = await token();

		// insérer le token en bdd
		const isToken = await createEmailToken(email);

		if (!isToken) return res.status(500).json({ error: msg.unknow });

		/* 
envoyer le mail
 */
		let { user } = ifUser;
		const isSend = await userPwdForgot(user, email, key);

		// Vérifier si email envoyé
		if (!isSend) return res.status(500).json({ error: msg.unknow });

		return res.json({sucess:msg.succes});
	} catch (e) {
		throw e;
		console.log(e.message);
	}
};
