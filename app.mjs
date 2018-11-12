import express from 'express';
import bodyParser from 'body-parser';
import User from './src/routes/user/user';
import UserEmail from './src/routes/mailing/userEmail';

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/', User, UserEmail);


export default app;