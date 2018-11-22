import { validateAccount } from "../../services/validation/account";
import { userWelcome } from "../../services/mail/sendmail/sendmail";
import { hashPwd } from "../../services/crypt/bcrypt.mjs";
import { createUser, findUser } from "../../models/querying/userQuery";
/**
  @desc Recupére le formulaire et transmet celui-ci à la fonction validataaccount
  @func validateAccount - Traite les entrées du formulaires
  @func UserWelcome - Envoi email de bienvenue
  @func HashPwd - Crypter le mot de passe
  @param {object} req.body - parametre de la fonction validateAccount
  @param {string} firstname - parametre de la fonction WelcomeUser
  @param {string} email -parametre de la fonction WelcomeUser
  @param {string} password - parametre de la fonction HashPwd
*/
const msg = { emailExist: "Cet émail existe déjà." };

const userCreate = async (req, res) => {
	const errors = validateAccount(req.body);

	// Vérifier si une erreur est renvoyée en testant les propriétés de l'objet errors.
	if (Object.keys(errors).length !== 0) return res.json({ msg: errors });

	// Vérifier si email utilisateur existe déjà
	const isUser = await findUser(req.body.email, "email", "email");
	if (isUser) {
		return res.json({ msg: { emailExist: msg.emailExist } }); // renvoyer
	}
	// Créer utilisateur
	else {
		const { firstname, lastname, email, password } = req.body;
		const hashed = await hashPwd(password); // hasher le mot de passe

		createUser(firstname, lastname, email, hashed).then(user => {
			userWelcome(firstname, email); // envoyer email de bienvenue

			return res.json({ msg: user });
		});
	}
};

export { userCreate };
