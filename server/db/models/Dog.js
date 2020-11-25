const Sequelize = require('sequelize');
const db = require('../db');
const { STRING, INTEGER, BOOLEAN } = Sequelize;

const Dog = db.define('dog', {
    dogName: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    dogAge: {
        type: INTEGER,
        allowNull: false,
    },
    energy: {
        type: INTEGER,
        validate: {
            max: 5,
            min: 1
        },
        defaultValue: 3
    },
    neutered: {
        type: BOOLEAN,
        allowNull: false,
    },
    dogImage: {
        type: STRING,
        defaultValue: '/images/notFound.png'
    }
})

module.exports = Dog;