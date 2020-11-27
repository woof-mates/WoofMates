const { db, User, Relationship } = require('./server/db')


const seed = async () => {
    try {
      console.log('seeding');
      await db.sync({ force: true });

      const user1 = await User.create({ firstName: 'charles', userEmail: 'ddd@ddd.com', password: 'blah'})
      const user2 = await User.create({ firstName: 'barb', userEmail: 'ddxxd@ddd.com', password: 'plaah'})
      await Relationship.create({ userId: user1.id, matchId: user2.id, result: 'UserLikedMatch'})

      await db.close();
      console.log('seeded');
    } catch (err) { console.error(err); }
  };
  
  seed();
  