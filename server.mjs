import sequelize from './src/models/config'
import app from './app';
import http from 'http';

const PORT = process.env.PORT || 4000 

let server = http.createServer(app);


// Lancer le serveur

sequelize
.sync()
.then( res =>{
    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
})
.catch(err => console.error(err))


