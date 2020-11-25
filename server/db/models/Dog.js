const Sequelize = require('sequelize');
const db = require('../db');
const { STRING, INTEGER, BOOLEAN, ARRAY, TEXT } = Sequelize;

const Dog = db.define('dog', {
    dogName: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    breed: {
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
    energyLevel: {
        type: INTEGER,
        validate: {
            max: 5,
            min: 1
        },
        defaultValue: 3
    },
    weight: {
        type: INTEGER,
    },
    neutered: {
        type: BOOLEAN,
        allowNull: false,
    },
    dogImage: {
        type: STRING,
        defaultValue: '/images/notFound.png'
    },
    dogInterests: {
        type: ARRAY(TEXT)
    },
})

module.exports = Dog;