const { db, User, Dog, Prompt, Relationship, Preference, Userpref } = require('..')
const createUsers = require('./users')
const createDogs = require('./dogs')
const createPrompts = require('./prompts')
const createRelationships = require('./relationships')
const createPreferences = require('./preference')
const createUserprefs = require('./userpref')

//Relationship seeding takes too long if there are too few users.  Keep this number high compared to # relps.
const NUM_USERS = 400;
const NUM_RELPS = 300;
const MAX_NUM_VOTES = 0;

const seed = async () => {
    try {
      console.log('creating users, dogs, prompts, relps, userprefs');
      let users = await createUsers(NUM_USERS);
      let dogs = createDogs(NUM_USERS)
      let prompts = createPrompts(NUM_USERS);
      let relationships = createRelationships(NUM_RELPS, NUM_USERS)
      let preferences = createPreferences(NUM_USERS, MAX_NUM_VOTES)
      let userprefs = createUserprefs(NUM_USERS)
      console.log('seeding into db')

      await db.sync({ force: true });
      let promises = [];

      // const pref = await Preference.create({'dogBreed': {golden:1, pug:2}})
      // let val  = pref.dogBreed.golden + 1
      // pref.update({'dogBreed': {...pref.dogBreed, golden: val}})
      for (let i = 0; i < users.length; i++){
        promises.push(User.create(users[i]))
      }

      await Promise.all(promises);

      promises = [];

      for (let i = 0; i < dogs.length; i++){
        promises.push(Dog.create(dogs[i]))
      }
      for (let i = 0; i < prompts.length; i++){
        promises.push(Prompt.create(prompts[i]))
      }
      for (let i = 0; i < relationships.length; i++){
        promises.push(Relationship.create(relationships[i]))
      }
      for (let i = 0; i < preferences.length; i++){
        promises.push(Preference.create(preferences[i]))
      }
      for (let i = 0; i < userprefs.length; i++) {
        promises.push(Userpref.create(userprefs[i]))
      }
      await Promise.all(promises);

      await db.close();
      console.log('seeded');
    } catch (err) { console.error(err); }
  };

  seed();
