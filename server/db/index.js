const db = require('./db');
const User = require('./models/User');
const Dog = require('./models/Dog');
const Session = require('./models/Session');
const MatchMetric = require('./models/MatchMetric');
const Relationship = require('./models/Relationship');

Dog.belongsTo(User);
Session.belongsTo(User);
MatchMetric.belongsTo(User);
Relationship.belongsTo(User);
// User.hasMany(User, {as: 'relationshiphistory'})

module.exports = { db, User, Dog, Session, MatchMetric, Relationship }