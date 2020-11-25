const db = require('./db');
const User = require('./models/User');
const Dog = require('./models/Dog');

Dog.belongsTo(User);

module.exports = { db, User, Dog }