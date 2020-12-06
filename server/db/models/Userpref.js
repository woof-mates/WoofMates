const Sequelize = require('sequelize')
const db = require('../db')
const { STRING, INTEGER } = Sequelize

const Userpref = db.define('userpref', {
    dogBreedPref: {
        type: STRING
    },
    dogAgePref: {
        type: STRING
    },
    dogEnergyLevelPref: {
        type: INTEGER
    },
    dogWeightPref: {
        type: STRING
    },
    userAgePref: {
        type: STRING
    },
    userProfessionsPref: {
        type: STRING
    }
})

module.exports = Userpref;