import { userPwdForgot } from "../../services/mail/sendmail/sendmail";
import { findUser, updateUser } from "../../models/querying/userQuery";
import { hashPwd } from "../../services/crypt/bcrypt.mjs";
import {
  createEmailToken,
  retrieveEmailToken,
  retrieveEmail,
  updateToken
} from "../../models/querying/tokenQuery";
import { token } from "../../services/crypt/token";
import { isValidEmail } from "../../services/validation/validation";
import { comparePwd } from "../../services/crypt/bcrypt";
import moment from "moment";


const msg = {
	unknow: "une erreur s'est produite, veuillez renouveller votre demande",
	email: "L'adresse email n'a pas été trouvée",
	success: "Un email vient de vous être envoyé",
	successmdp: " ,votre mot de passe a bien été modifié",
	logged:"Vous vous êtes bien connecté",
	expired: "Le lien de réinitialisation du mot de passe a expiré"
};


/**
 * @desc signIn - Traite la demande de connexion de l'utilisateur
 * @func isValidEmail - vérifie que le format email est valide
 * @func findUser - vérifie que le user existe via l'adresse email, récupére le mdp en bdd
 * @func comparePwd - vérifie que le mot de passe saisi correspond en bdd
 * @param {object} req.body - contient le contenu email et password
 */

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    /*
Vérifier le format du champ email
*/
    let isValid = await isValidEmail(email, "email");

    if (isValid) return res.json(isValid);

    /* 
Vérifier si le user existe
*/
    const ifUser = await findUser(email, "email");
    if (!ifUser) return res.json({ msg: { noEmail: msg.email } });

    /*
Récupérer le mot de passe lié à l'adresse Email
*/
	const userPass = await findUser(email,"email", "password");
	const { user } = userPass;
	const ifPassword = await comparePwd(password, user.password);

	  res.json({msg: { logged: msg.logged }})
  } catch (e) {
    throw e;
    console.log(e.message);
  }
};


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
        let { email } = req.body;
        let isValid = await isValidEmail(email, "email");
        if (isValid) return res.json(isValid); // Vérifier si il y a une erreur

        /*
 Rechercher user en bdd (users table)
*/
        const ifUser = await findUser(email, "email", "firstname"); // Chercher le user

        if (!ifUser) return res.json({ msg: { email: msg.email } }); // vérifier si l'émail existe en bdd

        let { user: { firstname } } = ifUser; // Extraire le prénom

        let key = await token(); // Générer un token

        /*
   Vérifier si une demande n'a pas déjà été demandée via l'email avant le délai d'expiration :
    - Si non, on continue le process (enregistrer user & token, envoi de mail)
	  - Si oui, on modifie le token par un nouveau
*/
        const isDemand = await retrieveEmail(email); // Rechercher user en bdd (resetpwds table).

        // Enregistrer la demande de réinitialisation
        if (!isDemand) {
          const isToken = await createEmailToken(email, key, firstname); // insérer le token en bdd
          if (!isToken) 
            return res
                  .status(500)
                  .json({ msg: { unknow: msg.unknow } });
        }
        // Remplacer le token le token
        else{
          const newToken = await updateToken(email, key);
          if (!newToken)
            return res
              .status(500)
              .json({ msg: { unknow: msg.unknow } });
        }
 
        // Envoi du mail
         const isSend = await userPwdForgot(firstname, email, key); 
         if (!isSend) 
            return res
                  .status(500)
                  .json({ msg: { unknow: msg.unknow } }); // Vérifier si email envoyé

        return res.json({ msg: { success: msg.success } }); // Affiché le message côté front
  }
	catch (e) {
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
		const dateOfdemand  = await retrieveEmailToken(token); // récupérer la date de demande si token existe en bdd
		if (!dateOfdemand) return res.status(400).json({ error: "Le token n'est pas valide" }); // si token invalid, retourner une erreur

    /*
Vérifier si le token n'a pas expiré (fixé à 2H)
*/
		let tokenDate = moment(dateOfdemand);
		let currentDate = moment(new Date());
		let duration = moment.duration(currentDate.diff(tokenDate));
		let limitDate = duration.asHours();

    if (limitDate > 2)
      return res
            .status(403)
            .json({ msg: { err: msg.expired } }); // si token expiré

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
 @desc - Modifier le mot de passe :
        - Récupérer le user depuis le token
        - Modifier le mot de passe en bdd
        - Envoyer un email de confirmation
 @func newPwdSave - Enregistrer le nouveau mot de passe
 */

 export const newPwdSave = async (req, res) => {
  try{
  const { token, password } = req.body; // Extraire le token et mot de passe formulaire
  
	const { email, user } = await retrieveEmailToken(token); // Récupérer l'adresse mail

	const hashed = await hashPwd(password);  // hasher le mot de passe
	
  if (!hashed) 
    return res
          .status(500)
          .json({ msg: { unknow: msg.unknow } });

	// Modifier l'ancien mot de passe par le nouveau
	const updated = await updateUser(email, hashed);
  if (!updated) 
    return res
          .status(500)
          .json({ msg: { unknow: msg.unknow } });

	const name = `${user.charAt(0).toUpperCase()}${user.slice(1)}`

	res.send({ msg: { success: `Merci ${name}${msg.successmdp}` } })
  }
  catch(err){
    throw err
    console.log(error)
  }
 }