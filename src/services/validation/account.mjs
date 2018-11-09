import validator from "validator";
import { isEmpty } from "./isEmpty";


/*
Validateurs

isEmpty : vérifie si aucun champ n'est vide
iValidLength: Vérifie si le nb de caractères requis est respecté.
...
*/
const isValidEmpty = (value, field) => {
    if (validator.isEmpty(value))
        return `Le champ ${field} doit être rempli`;
};

const isValidLength = (value, field) => {
  if (!validator.isLength(value, { min: 2, max: 30 }))
    return `Le champ ${field} doit être contenir entre 2 et 30 caractères`;
};



/*

Validation globale du formulaire

*/

export const validateAccount = data => {
  let errors = {};

  let { firstname, lastname, email, password } = data;

  
  firstname = !isEmpty(firstname) ? firstname : "";
  lastname = !isEmpty(lastname) ? lastname : "";
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";

  
  
  // Vérifier les champs.
  errors.firstname = {
      empty: isValidEmpty(firstname,"prénom"),
      length: isValidLength(firstname, "prénom"),
  };
  
  errors.lastname ={ 
      empty: isValidEmpty(lastname,"nom"),
      length:isValidLength(lastname, "nom")
    };

  errors.email = {
      empty: isValidEmpty(email, "email"),
      length:isValidLength(email, "email")
    };

  errors.password = {
      empty: isValidEmpty(password, "mot de passe"),
      length:isValidLength(password, "mot de passe")
    };

    // test
    console.log(errors)
};
