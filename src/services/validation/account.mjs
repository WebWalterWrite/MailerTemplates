import validator from 'validator';
import { isValidEmail, isValidLength, isValidEmpty } from "./validation";

/**
  * @desc Controler les champs de formulaire
  * @param {string} firstname - champ de formulaire
  * @param {string} lastname  - champ de formulaire
  * @param {string} email - champ de formulaire
  * @param {string} password - champ de formulaire
  * @callback 
  * @return {array} - tableau d'objets
*/

export const validateAccount = (data) => {
  let errors = {};
  
  let { firstname, lastname, email, password } = data;

  errors.errFirstname = isValidEmpty(firstname.trim(), "prenom", isValidLength);

  errors.errLastname = isValidEmpty(lastname.trim(), "nom", isValidLength);

  errors.errEmail = isValidEmpty(email.trim(), "email", isValidEmail);

  errors.errPassword = isValidEmpty(password.trim(), "mot de passe", isValidLength);


  // Supprimer les propriétés d'objet avec une valeur undefined
    for(let errorname in errors){
      if (errors[errorname] === undefined)
      delete errors[errorname]
    }
  // Renvoi un objet avec les erreurs
  return errors ;
};
