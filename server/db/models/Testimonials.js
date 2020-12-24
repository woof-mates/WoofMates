const Sequelize = require('sequelize');
const db = require('../db');
const { TEXT, INTEGER } = Sequelize;

const Testimonial = db.define('testimonial', {
    reviewTitle: {
        type: TEXT
    },
    numberOfStars: {
        type: INTEGER
    },
    reviewBody: {
        type: TEXT
    }
});

module.exports = Testimonial
