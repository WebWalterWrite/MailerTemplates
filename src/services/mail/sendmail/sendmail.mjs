import emailer from '../config';


/**
  * @desc envoi mail de bienvenue
  * @func UserWelcome
  * @param {string} name - nom de l'utilisateur
  * @param {string} email - adresse mail destinataire
  * @return bool - success or failure
*/

export const UserWelcome = (name, email) => {

    emailer.sendMail({
        to: email,
        subject:`${name} bienvenue à toi`,
        template:'welcome',
        context:{
            name: name
        }

    })
}
