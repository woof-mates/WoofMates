const db = require('./db');
const User = require('./models/User');
const Dog = require('./models/Dog');
const Session = require('./models/Session');
const MatchMetric = require('./models/MatchMetric');
const Relationship = require('./models/Relationship');
const Prompt = require('./models/Prompt');

Dog.belongsTo(User);
Session.belongsTo(User);
MatchMetric.belongsTo(User);
User.belongsToMany(User, { as: 'match', through: Relationship });
Prompt.belongsTo(User);

module.exports = { db, User, Dog, Session, MatchMetric, Relationship, Prompt }