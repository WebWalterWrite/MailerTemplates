import express from 'express';
import bodyParser from 'body-parser';
import User from './src/routes/user/user';


const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/', User);

export default app;