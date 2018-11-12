import { validateAccount } from "../../services/validation/account";
import { userWelcome } from "../../services/mail/sendmail/sendmail";
import { hashPwd } from '../../services/crypt/bcrypt.mjs';
import User from '../../models/user';
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

  if (errors.length !== 0) {
    res.status(400).json(errors);
  } else {

    // données du formulaire
    const { firstname, lastname, email, password } = req.body;
  
    /** @function */
    const hashed = await hashPwd(password);
    
    // créer le user
    User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashed
    })
    .then( ({firstname,email}) => {

      userWelcome(firstname, email);
      res.json({ user: firstname})
    });

   
  }
};

export { userCreate };
