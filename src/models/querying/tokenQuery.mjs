import PwdForgot from '../pwdForgot';


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
        return dateOfdemand;
        }
        return false;
        
    } 
    catch (err) {
        throw err;
        console.log(err.message)
    }
}


  
  export {
      createEmailToken,
      retrieveEmailToken,
  }