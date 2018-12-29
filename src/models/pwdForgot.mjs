import Sequelize from 'sequelize';
import sequelize from './config';

const PwdForgot = sequelize.define('resetpwds',{
    id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user:{
        type: Sequelize.STRING,
        allowNull: false
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