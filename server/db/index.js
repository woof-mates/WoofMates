const db = require('./db');
const User = require('./models/User');
const Dog = require('./models/Dog');
const Session = require('./models/Session');
const Testimonials = require('./models/Testimonials');
const Relationship = require('./models/Relationship');
const Prompt = require('./models/Prompt');
const Preference = require('./models/Preference');
const Userpref = require('./models/Userpref');

Dog.belongsTo(User);
User.hasOne(Dog);
User.hasOne(Session);
Session.belongsTo(User);
Testimonials.belongsTo(User);
User.hasOne(Testimonials)
User.belongsToMany(User, { as: 'match', through: Relationship });
Prompt.belongsTo(User);
User.hasOne(Prompt);
Preference.belongsTo(User);
User.hasOne(Preference);
Userpref.belongsTo(User);
User.hasOne(Userpref);

module.exports = { db, User, Dog, Session, Testimonials, Relationship, Prompt, Preference, Userpref }
