import { userPwdForgot } from "../../services/mail/sendmail/sendmail";
import { findUser, updateUser } from "../../models/querying/userQuery";
import { hashPwd } from "../../services/crypt/bcrypt.mjs";
import {
	createEmailToken,
	retrieveEmailToken
} from "../../models/querying/tokenQuery";
import { token } from "../../services/crypt/token";
import { isValidEmail } from "../../services/validation/validation";
import moment from "moment";

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

const msg = {
	unknow: "une erreur s'est produite, veuillez renouveller votre demande",
	email: "L'adresse email n'a pas été trouvée",
	success: "Un email vient de vous être envoyé",
	successmdp:" ,votre mot de passe a bien été modifié",
	expired: "Le lien de réinitialisation du mot de passe a expiré"
};

export const pwdForgot = async (req, res) => {
	try {
		/*
vérifier le champ email
*/
		let { email } = req.body;

		let isValid = await isValidEmail(email, "email");

		// Vérifier si il y a une erreur
		if (isValid) return res.json(isValid);

		/*
 Rechercher user en bdd
*/
		const ifUser = await findUser(email, "email", "firstname");

		// vérifier si l'émail existe en bdd
		if (!ifUser) {
			return res.json({ msg: { email: msg.email } });
		}

		// Générer un token
		let key = await token();
		let { user } = ifUser;
		console.log(user)
		// insérer le token en bdd
		const isToken = await createEmailToken(email, key, user);

		if (!isToken) return res.status(500).json({ msg: { unknow: msg.unknow } });

		/* 
envoyer le mail
 */
		
		const isSend = await userPwdForgot(user, email, key);

		// Vérifier si email envoyé
		if (!isSend) return res.status(500).json({ msg: { unknow: msg.unknow } });

		return res.json({ msg: { success: msg.success } });
	} catch (e) {
		throw e;
		console.log(e.message);
	}
};

/**
  @desc Renvoi un email suite à une demande de réinitialisation de mot de passe
  @func pwdInitialize -  traite le formulaire 'mot de passe oublié'
  @func isToken - Vérifie si le token est valide en bdd
  @func token - créer un token à joindre en paramêtre url
  @param {object} req.params - contient le token 
*/

export const pwdInitialize = async (req, res) => {
	try {
		/*
Vérifier si le token est valide
*/
		let { token } = req.params; // récupérer le token depuis l'url
		const { dateOfdemand } = await retrieveEmailToken(token); // récupérer le token en bdd
		
		if (!dateOfdemand) return res.status(400).json({ error: "ko" }); // si token invalid

		/*
Vérifier si le token n'a pas expiré (fixé à 2H)
*/
		let tokenDate = moment(dateOfdemand);
		let currentDate = moment(new Date());
		let duration = moment.duration(currentDate.diff(tokenDate));
		let limitDate = duration.asHours();

		if (limitDate > 2)
			return res.status(403).json({ msg: { err: msg.expired } }); // si token expiré

		/*
  rediriger vers la page de création de nouveau mdp.
*/
		return res.redirect(`http://localhost:3000/formulaire/nouveau-mot-de-passe/${token}`); // token valide.
	} catch (e) {
		throw e;
		console.log(e.message);
	}
};


/**
 @func newPwdSave - Enregistrer le nouveau mot de passe
 @param {string} password - Le nouveau mot de passe
 */

 export const newPwdSave = async (req, res) => {

	const { token, password } = req.body;

	// Récupérer l'adresse mail
	const { email, user } = await retrieveEmailToken(token);

	// hasher le nouveau mot de passe
	const hashed = await hashPwd(password);  // hasher le mot de passe
	
	if (!hashed) return res.status(500).json({ msg: { unknow: msg.unknow } });

	// Modifier l'ancien mot de passe par le nouveau
	const updated = await updateUser(email, hashed);
	if (!updated) return res.status(500).json({ msg: { unknow: msg.unknow } });

	const name = `${user.charAt(0).toUpperCase()}${user.slice(1)}`

	res.send({ msg: { success: `Merci ${name}${msg.successmdp}` } })

 }