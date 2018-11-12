import Sequelize from 'sequelize';
import key from '../config/keys';

const {DB, USER, PWD} = key.sqlz;
console.log(DB)
const sequelize = new Sequelize (DB, USER, PWD,{
    host:'localhost',
    dialect:'mysql',
    define:{
    timestamps: false
    }
})

export default sequelize;