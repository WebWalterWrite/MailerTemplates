import { userPwdForgot } from '../../services/mail/sendmail/sendmail';
import { findUser } from '../../models/querying/userQuery';
import { token } from '../../services/crypt/token' ;

export const pwdForgot = async (req, res) => {
    try{
        let {email} = req.body;

        // vérifier si l'émail existe
        const ifUser = await findUser(email, 'email', 'firstname')
        
        if(ifUser){
            // Générer un token
            let key = await token();
            
            // insérer le token en bdd
            /* code code */
            
            // envoyer le mail
            let { user } = ifUser;
            const isSend = await userPwdForgot(user,email, key)

            // Vérifier si email envoyé
            isSend ? res.send({success:'email envoyé'}) : res.send({reject:'erreur rencontrée'}) 
         }
    }
    catch(err){
        throw err;
        console.log(err)
    }
};


