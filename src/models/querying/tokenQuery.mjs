import PwdForgot from '../pwdForgot';
import { pwdForgot } from '../../controllers/user/user.mjs';


const createEmailToken =  async (email, key, user) =>{

    try{
      const token = await PwdForgot.create({
          user:user,
          email:email,
          token:key,
        })
      
        return token;
    }
    catch(err){
      console.log(err.message)
      return false;
    }
  };

const retrieveEmailToken = async (data) => {
    try {
        const token = await PwdForgot.findOne({where:{token:data}});
        if(token){
        const { dateOfdemand } = token.dataValues;
        console.log(dateOfdemand);
        return dateOfdemand;
        }
        return false;
        
    } 
    catch (err) {
        throw err;
        console.log(err.message)
    }
}

const retrieveEmail = async ( data ) => {
    try {
        const email = await PwdForgot.findOne({ where:{ email: data } });
       
        return email && true;

    } catch (error) {
        
    }
}

const updateToken = async (email, token) => {
    try {
        console.log(token)
        const status = await PwdForgot.update(
            {token:token}
            ,{
            where:{email:email}
            })
        console.log('updateToken :', status)
        return status && true;

    } catch (err) {
        throw err
        console.log(err.message)
    }
}
  
  export {
      createEmailToken,
      retrieveEmailToken,
      retrieveEmail,
      updateToken
  }