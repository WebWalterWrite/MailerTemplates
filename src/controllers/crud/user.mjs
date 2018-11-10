import { validateAccount} from '../../services/validation/account'

/**
  @desc Recupére le formulaire et transmet celui-ci à la fonction validataaccount
  @function validateAccount - Traite les entrées du formulaires
*/

const userCreate = (req, res) => {

   const errors = validateAccount(req.body);

   console.log(req.headers)
  
   if(errors.length !== 0){
     res.status(400).json(errors)
   }
   else{
     res.send(req.body.firstname)
   }
}

export {
    userCreate
}

