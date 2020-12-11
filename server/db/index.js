const db = require('./db');
const User = require('./models/User');
const Dog = require('./models/Dog');
const Session = require('./models/Session');
const MatchMetric = require('./models/MatchMetric');
const Relationship = require('./models/Relationship');
const Prompt = require('./models/Prompt');
const Preference = require('./models/Preference');
const Userpref = require('./models/Userpref');

Dog.belongsTo(User);
User.hasOne(Dog);
User.hasOne(Session);
Session.belongsTo(User);
MatchMetric.belongsTo(User);
User.belongsToMany(User, { as: 'match', through: Relationship });
Prompt.belongsTo(User);
Preference.belongsTo(User);
User.hasOne(Preference);
Userpref.belongsTo(User);
User.hasOne(Userpref);

module.exports = { db, User, Dog, Session, MatchMetric, Relationship, Prompt, Preference, Userpref }
