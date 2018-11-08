import app from 'express';

const router = app.Router();

router.use((req, res, next)=>{

        res.header("Access-Control-Allow-Origin",  req.headers.origin);
        res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Credentials", "true");
        next()
});

export default router

