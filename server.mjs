import app from './app';
import http from 'http';

const PORT = process.env.PORT || 4000 

let server = http.createServer(app);

// Lancer le serveur
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
