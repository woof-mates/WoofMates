const Sequelize = require('sequelize');
const db = require('../db');
const { INTEGER, FLOAT } = Sequelize;

const MatchMetric = db.define('matchmetric', {
    matchId: {
        type: INTEGER
    },
    overallRanking: {
        type: FLOAT
    }
});

module.exports = MatchMetric
