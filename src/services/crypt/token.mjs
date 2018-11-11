import RandomString from "randomstring";
import Crypto from "crypto";

/**
 * @desc créer un token pour url de réinitialisation de mot de passe
 * @func token
 * @returns {string}
 */

export const token = async () => {
	const hash = Crypto.createHash("sha256");
	const string = RandomString.generate(8);

	return await hash.update(string).digest("hex");
};
