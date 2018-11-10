import emailer from '../config';


/**
  * @desc envoi mail de bienvenue
  * @param string name, email - Valeurs pour envoyer le mail
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
