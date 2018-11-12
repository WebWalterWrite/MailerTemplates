import dotEnv from 'dotenv';
dotEnv.config();

const key={

    google:{
        USER_SECRET : process.env.GOOGLE_USER_CLIENT_SECRET,
        USER_ID : process.env.GOOGLE_USER_CLIENT_ID,
        USER_REFRESH_TOKEN: process.env.GOOGLE_USER_REFRESH_TOKEN,
        USER_EMAIL: process.env.GOOGLE_USER_EMAIL
    },

    sqlz:{
        DB: process.env.SQLZ_DB,
        USER: process.env.SQLZ_USER,
        PWD: process.env.SQLZ_PASSWORD
    }
} ;

export default key;