import validator from "validator";

// Vérifier si le champ ne comporte aucun carctère.

/*
Validateurs

isEmpty : vérifie si aucun champ n'est vide
iValidLength: Vérifie si le nb de caractères requis est respecté.
isValidEmail : Vérifie la structure de l'addresse mail
*/

const isValidEmpty = (value, field, cb) => {
  let msg = `Le champ ${field} doit être rempli`;

  if (validator.isEmpty(value)) return msg;

  return cb(value, field);
};

const isValidLength = (value, field) => {
  let msg = `Le champ ${field} doit être contenir entre 2 et 30 caractères`;

  if (!validator.isLength(value, { min: 2, max: 30 })) return msg;
};

const isValidEmail = (value, field) => {
  let msg = `L'${field} saisi ne correspond pas à une adresse email valide`;

  if (!validator.isEmail(value)) return msg;
};

export { isValidEmail, isValidEmpty, isValidLength };
