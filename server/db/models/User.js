const Sequelize = require('sequelize')
const db = require('../db')
const { STRING, ENUM } = Sequelize

const User = db.define('user', {
    userType: {
        type: ENUM('admin', 'user'),
        defaultValue: 'user'
    },
    firstName: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    lastName: {
        type: STRING
    },
    userEmail: {
        type: STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true,
        },
    },
    password: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userImage: {
        type: STRING,
        defaultValue: '/images/notFound.png'
    }
})

module.exports = User;