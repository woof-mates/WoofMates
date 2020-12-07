const Sequelize = require('sequelize')
const db = require('../db')
const { STRING, INTEGER, ARRAY } = Sequelize

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
    userAgePref: { // store as multiples of 10 (with implied range of +9 e.g. 10-19, 20-29) for ease of use later
        type: INTEGER
    },
    userProfessionsPref: {
        type: ARRAY(STRING)
    },
    userInterestsPref: {
        type: ARRAY(STRING)
    }
})

module.exports = Userpref;
