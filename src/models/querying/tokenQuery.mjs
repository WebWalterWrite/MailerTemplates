import PwdForgot from '../pwdForgot';


const createEmailToken =  async (email, key) =>{
    try{
      const token = await PwdForgot.create({
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


  
  export {
      createEmailToken,
  }