import Sequelize from 'sequelize';
import sequelize from './config';

const User = sequelize.define('users',{
    id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true
    },
    firstname:{
        type: Sequelize.STRING(32),
        allowNull: false,
    },
    lastname:{
        type: Sequelize.STRING(32),
        allowNull: false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail:true
        }
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});


export default User;