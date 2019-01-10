import  nodemailer from 'nodemailer';
import google from 'googleapis';
import hbs from 'nodemailer-express-handlebars';
import key from '../../config/keys';

const {USER_ID, USER_EMAIL, USER_SECRET, USER_REFRESH_TOKEN} = key.google;

const oAuth2 = google.google.auth.OAuth2;

const oAuth2Client = new oAuth2(
    USER_ID,
    USER_SECRET,
    "https://developers.google.com/oauthplayground/"
)

oAuth2Client.setCredentials({
    refresh_token:USER_REFRESH_TOKEN
})


const accesstoken = oAuth2Client.getRequestHeaders();




/**
 * @property {object} credentials - identifiants api-gmail
 * @property {string} credentials.type - type d'authentification
 * @property {string} credentials.user - identifiant mail de l'API
 * @property {string} credentials.clientId - clé id api gmail
 * @property {string} credentials.clientSecret -clé secréte api gmail
 * @property {string} credentials.refreshToken - token oauthplayground
 * @property {string} credentials.accesstoken - token d'accès oauthplayground
 */

const credentials = {
    type: 'OAuth2',
    user:USER_EMAIL,
    clientId:USER_ID,
    clientSecret:USER_SECRET,
    refreshToken:USER_REFRESH_TOKEN,
    accessToken:accesstoken,

};


const email = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: credentials
})


email.use('compile',hbs({
    viewPath: 'src/services/mail/templates',
    extName: '.hbs'
}))

export default email;