const Sequelize = require('sequelize');
const db = require('../db');
const { UUID } = Sequelize;

const Session = db.define('session', {
    sid: {
        type: UUID
    }
});

module.exports = Session