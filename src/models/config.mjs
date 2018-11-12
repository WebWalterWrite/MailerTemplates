import Sequelize from 'sequelize';
import key from '../config/keys';

const {DB, USER, PWD, PORT=null} = key.sqlz;

const sequelize = new Sequelize (DB, USER, PWD,{
    host:'localhost',
    dialect:'mysql',
    port:PORT,
    define:{
    timestamps: false
    }
})

export default sequelize;