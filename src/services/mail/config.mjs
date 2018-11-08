import  nodemailer from 'nodemailer';
import google from 'googleapis';
import hbs from 'nodemailer-express-handlebars';
import key from '../../config/keys';

const {USER_ID, USER_EMAIL, USER_SECRET, USER_REFRESH_TOKEN} = key.google;

console.log(USER_REFRESH_TOKEN);

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

const credentials = {
    type: 'oAuth2',
    user:USER_EMAIL,
    clientId:USER_ID,
    clientSecret:USER_SECRET,
    refreshToken:USER_REFRESH_TOKEN,
    accessToken:accesstoken
};
console.log(credentials)
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