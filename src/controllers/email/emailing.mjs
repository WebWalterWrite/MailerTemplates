import { UserWelcome } from '../../services/mail/sendmail/sendmail';
/**
  * @desc envoi mail de bienvenue
  * @param string name, email - Valeurs pour envoyer le mail
  * @return bool - success or failure
*/
export const WelcomeEmail = (req, res, next) => {

 
  res.send('email envoyé');

};



