import { validateAccount } from "../../services/validation/account";
import { UserWelcome } from "../../services/mail/sendmail/sendmail";

/**
  @desc Recupére le formulaire et transmet celui-ci à la fonction validataaccount
  @function validateAccount - Traite les entrées du formulaires
  @function UserWelcome - Envoi email de bienvenue
  @param {object} req.body - parametre de la fonction validateAccount
  @param {string} firstanme - parametre de la fonction WelcomeUser
  @param {string} email -paramêtre de la fonction WelcomeUser
*/

const userCreate = (req, res) => {
  const errors = validateAccount(req.body);

  if (errors.length !== 0) {
    res.status(400).json(errors);
  } else {
    const { firstname, lastname, email, password } = req.body;

    /* ici votre code d'insertion en db et cryptage du mdp */
    /* ....code  */

    // envoi du mail de bienvenue
    UserWelcome(firstname, email);
  }
};

export { userCreate };
