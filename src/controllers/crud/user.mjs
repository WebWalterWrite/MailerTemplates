import { validateAccount} from '../../services/validation/account'

/**
  @desc créer un nouvel user
*/

const userCreate = (req, res) => {

   const errors = validateAccount(req.body);
  
   if(errors.length !== 0){
     res.status(400).json(errors)
   }
   else{
   return res.send(req.body.firstname)
   }
}



export {
    userCreate
}

