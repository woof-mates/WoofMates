const { db, User, Dog, Prompt, Relationship } = require('..')
const createUsers = require('./users')
const createDogs = require('./dogs')
const createPrompts = require('./prompts')
const createRelationships = require('./relationships')

//Relationship seeding takes too long if there are too few users.  Keep this number high compared to # relps.
const NUM_USERS = 100;
const NUM_RELPS = 200;


const seed = async () => {
    try {
      console.log('creating users,dogs,prompts,relps');
      let users = createUsers(NUM_USERS);
      let dogs = createDogs(NUM_USERS)
      let prompts = createPrompts(NUM_USERS);
      let relationships = createRelationships(NUM_RELPS, NUM_USERS)

      console.log('seeding into db')

      await db.sync({ force: true });
      let promises = [];

      for (let i = 0; i <users.length; i++){
        promises.push(User.create(users[i]))
      }

      await Promise.all(promises);

      promises = [];

      for(let i = 0; i <dogs.length; i++){
        promises.push(Dog.create(dogs[i]))
      }
      for(let i = 0; i <prompts.length; i++){
        promises.push(Prompt.create(prompts[i]))
      }
      for(let i = 0; i <relationships.length; i++){
        promises.push(Relationship.create(relationships[i]))
      }

      await Promise.all(promises);

      await db.close();
      console.log('seeded');
    } catch (err) { console.error(err); }
  };

  seed();
