import express from 'express';
import bodyParser from 'body-parser';
import userEmail from './src/routes/mailing/userEmail';

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/', userEmail);

export default app;