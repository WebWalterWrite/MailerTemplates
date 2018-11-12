import emailer from "../config";

/**
 * @desc envoi mail de bienvenue
 * @param {string} name, email - Valeurs pour envoyer le mail
 * @return {bool} - success or failure
 */
const userWelcome = (name, email) => {
  console.log(email);
  emailer.sendMail({
    to: email,
    subject: `${name} bienvenue à toi`,
    template: "welcome",
    context: {
      name: name
    }
  });
};

const userPwdForgot = async (name, email, token) => {
  try {
    const status = await emailer.sendMail({
      to: email,
      subject: `${name} réinitialise ton mot de passe oublié`,
      template: "passwordForgot",
      context: {
        token: token
      }
    });

    return status;
  } catch (err) {
    console.log(err);
  }

};

export { userWelcome, userPwdForgot };
