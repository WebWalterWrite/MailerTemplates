import bCrypt from "bcrypt";

const saltRounds = 10;

/**
 * @desc Fonction de hash password
 * @func HashPwd
 * @param {string} PlaintextPassword - mot de passe en clair
 * @return {Promise<string>}  - Le mot de passe crypté.
 */

export const hashPwd = async PlaintextPassword => {
	
	try{
	const Hashed = await bCrypt.hash(PlaintextPassword, saltRounds);

	return Hashed;
	}
	catch(err){
		throw err
	}
};


/**
 * @desc Comparer le password
 * @func ComparePwd
 * @param {Òtring} PlaintextPassword - mot de passe saisi
 * @param {string} passwordHash - mot de passe crypté en db
 * @return {boolean} 
 */

 export const comparePwd = async (PlaintextPassword, passwordHash) => {
	const isMatch = await bCrypt.compare(PlaintextPassword, passwordHash);
	return isMatch;
 };



