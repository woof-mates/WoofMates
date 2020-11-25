const Sequelize = require('sequelize');
const db = require('../db');
const { ENUM, INTEGER } = Sequelize;

const Relationship = db.define('relationship', {
    result: {
        type: ENUM('liked', 'rejected')
    },
    matchId: {
        type: INTEGER
    }    
})

module.exports = Relationship;