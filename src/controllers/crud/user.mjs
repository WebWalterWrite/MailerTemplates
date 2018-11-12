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

const userCreate = async (req, res) => {
	const errors = validateAccount(req.body);

	if (errors.length !== 0) return res.status(400).json(errors);

  const isUser = await findUser(req.body.email, 'email', 'firstname');

// Vérifier si email utilisateur existe déjà 
	if (isUser){
    let msg= { errors: 'Cet émail existe déjà.' }
		return res.json(msg); // renvoyer 
  } 
// Créer utilisateur
  else {
    const { firstname, lastname, email, password } = req.body;
    const hashed = await hashPwd(password); // hasher le mot de passe

    createUser(firstname, lastname, email, hashed)
    .then( user => {
      userWelcome(firstname, email) // envoyer email de bienvenue
      res.json(user);
    })
	}
};

export { userCreate };
