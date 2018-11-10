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

  errors.firstname = isValidEmpty(firstname, "prenom", isValidLength);

  errors.lastname = isValidEmpty(lastname, "nom", isValidLength);

  errors.email = isValidEmpty(email, "email", isValidEmail);

  errors.password = isValidEmpty(password, "mot de passe", isValidLength);

  // Retourne un array de - errors -
  const Errors = Object.values(errors);

  // La valeur de nos entrées Errors ne doivent pas être undefined
  const isError = entry => entry !== undefined;

  // Renvoi un array vide ou avec les erreurs
  return Errors.filter(isError);
};
