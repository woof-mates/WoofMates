const Sequelize = require('sequelize')
const db = require('../db')
const { STRING, ENUM, INTEGER, ARRAY, TEXT, FLOAT } = Sequelize
const {USER_INTERESTS, PROFESSIONS} = require('../../../constants')

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
    hashedPassword: {
        type: TEXT,
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
        type: INTEGER,
        allowNull: false
    },
    city: {
        type: STRING
    },
    state: {
        type: STRING
    },
    userInterests: {
        type: ARRAY(ENUM(...USER_INTERESTS)),
    },
    age: {
        type: INTEGER,
        allowNull: false
    },
    profession: {
        type: STRING
    },
    userLatitude: {
        type: FLOAT,
    },
    userLongitude: {
        type: FLOAT,
    }
})

module.exports = User;
