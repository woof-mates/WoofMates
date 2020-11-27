const Sequelize = require('sequelize');
const db = require('../db');
const { TEXT } = Sequelize;

const Prompt = db.define('prompt', {
    dogSpeak: {
        type: TEXT
    },
    favoriteActivityWithDog: {
        type: TEXT
    }
});

module.exports = Prompt;