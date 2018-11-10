import { validateAccount } from "../../services/validation/account";
import { UserWelcome } from "../../services/mail/sendmail/sendmail";
import { HashPwd } from '../../services/crypt/bcrypt.mjs';

/**
  @desc Recupére le formulaire et transmet celui-ci à la fonction validataaccount
  @func validateAccount - Traite les entrées du formulaires
  @func UserWelcome - Envoi email de bienvenue
  @func HashPwd - Crypter le mot de passe
  @param {object} req.body - parametre de la fonction validateAccount
  @param {string} firstanme - parametre de la fonction WelcomeUser
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
    const hashed = await HashPwd(password);

    /* code d'insertion en db (sql, nosql) et cryptage du mdp */
    
    // envoi du mail de bienvenue
    UserWelcome(firstname, email);
  }
};

export { userCreate };
