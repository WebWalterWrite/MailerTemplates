import User from "../user";

/**
 * @desc Créer un utilisateur
 * @func createUser
 * @param {string} firstname - prénom de l'utilisateur
 * @param {string} lastname - nom de l'utilisateur
 * @param {string} email - email utilisateur
 * @param {string} password - mot de passe utilisateur
 * @return {object} - prénom utilisateur
 */

const createUser = async (firstname, lastname, email, password) => {
  try {
    const user = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    });
    return {
      user: `${firstname}, votre compte a bien été créée, un email vous a été expédié.`
    };
  } catch (err) {
    throw err;
    console.error(err.message);
  }
};

/**
 * @desc Récupérer un utilisateur
 * @func findUser
 * @param {string} data - nom de l'utilisateur
 * @param {string} field - le champ en base de donnée
 * @return {boolean} - true or false
 */

const findUser = async (data, field, target) => {
  try {
    const user = await User.findOne({
      where: { [field]: data },
      attributes: [target]
    });
    if (user) {
      const { firstname } = user.dataValues;
      return { user: firstname };
    } else {
      return false;
    }
  } catch (err) {
    throw err;
    console.error(err.message);
  }
};


const updateUser = async (email, password) => {

  console.log('updateUser function', email, password)
  const user = await User.update({
    password: password
  },{
    where:{email:email},
    attributes: 'firstname'
  }
  ).then((updateUser)=>{
    return updateUser;
  })
  console.log(user)
  return user;

}
export { createUser, findUser, updateUser };
