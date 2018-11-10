import emailer from "../config";

/**
 * @desc envoi mail de bienvenue
 * @func UserWelcome
 * @param {string} name - nom de l'utilisateur
 * @param {string} email - adresse mail destinataire
 * @return bool - success or failure
 */

export const UserWelcome = (name, email) => {
	emailer.sendMail({
		to: email,
		subject: `${name} bienvenue à toi`,
		template: "welcome",
		context: {
			name: name
		}
	}),
		(err, info) => {
			if (err) throw err;
			console.log(info.envelope);
			console.log(info.messageId);
		};
};

/**
 * @desc envoi mail de bienvenue
 * @func UserPwdForgot
 * @param {string} name - nom de l'utilisateur
 * @param {string} email - adresse mail destinataire
 * @param {string} token - token vérification
 * @return bool - success or failure
 */

export const UserPwdForgot = (name, email, token) => {
	emailer.sendMail({
		to: email,
		subject: "Réinitialisation du mot de passe",
		template: "forgot",
		context: {
			name: name,
			token: token
		}
	}),
		(err, info) => {
			if (err) throw err;
			console.log(info.envelope);
			console.log(info.messageId);
		};
};
