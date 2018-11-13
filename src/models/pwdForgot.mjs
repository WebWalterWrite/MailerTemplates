import Sequelize from 'sequelize';
import sequelize from './config';

const PwdForgot = sequelize.define('resetpwds',{
    id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    token:{
        type: Sequelize.STRING,
        allowNull: false
    },
    dateOfdemand:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
})


export default PwdForgot;