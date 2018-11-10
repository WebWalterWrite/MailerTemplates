import bCrypt from "bcrypt";

/**
 * @desc Fonction de hash password
 * @func HashPwd
 * @param {string} PlaintextPassword - mot de passe en clair
 * @return {Promise<string>}  - Le mot de passe crypté.
 */

const saltRounds = 10;

export const HashPwd = async PlaintextPassword => {
    
	const Hashed = await bCrypt.hash(PlaintextPassword, saltRounds);

	return Hashed;
};
