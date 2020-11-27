const Sequelize = require('sequelize')
const db = require('../db')
const { STRING, ENUM, INTEGER, ARRAY, TEXT } = Sequelize

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
    userImage1: {
        type: STRING,
        defaultValue: '/images/notFound.png'
    },
    userImage2: {
        type: STRING,
        defaultValue: '/images/notFound.png'
    },
    dogImage: {
        type: STRING,
        defaultValue: '/images/notFound.png'
    },
    zipCode: {
        type: INTEGER
    },
    userInterests: {
        type: ARRAY(TEXT)
    }
})

module.exports = User;