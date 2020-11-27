const Sequelize = require('sequelize');
const db = require('../db');
const { ENUM } = Sequelize;

const Relationship = db.define('relationship', {
    result: {
        type: ENUM('liked', 'rejected'),
        allowNull: false
    },
})

module.exports = Relationship;