const router = require('express').Router()
const { User, Session, Preference, Dog, Prompt } = require('../db/index')

const A_WEEK_IN_SECONDS = 1000 * 60 * 60 * 24 * 7;

router.get('/', async(req, res, next) => { // api/users
  try {
    res.send(await User.findAll());
  }
  catch (ex) {
    next(ex)
  }
})

router.get('/get-user', (req, res, next) => {
  try {
    res.send(req.user)
  }
  catch (err) {
      next(err)
  }
})

router.get('/:userId', async(req, res, next) => { // single user profile
  try {
    if (req.user.id === Number(req.params.userId)){
      const userProfile = await User.findOne({
        where: {
          id: req.params.userId
        },
        include: [Preference, Dog]
      });
      console.log('backend', userProfile)
      res.send(userProfile)
    }
    else {
      res.send('You are unauthorized to access this.')
    }
  }
  catch (ex) {
    next(ex)
  }
})

router.post('/register', async(req, res, next) => { // register a user (api/users/register)
  try {
    console.log('trying to create a new user')

    const newSession = await Session.create()

    const {firstName, lastName, userEmail, hashedPassword, city, state, zipCode, age, profession, userInterests, dogSpeak, favoriteActivityWithDog, dogName, breed, dogAge, energyLevel, weight, neutered, dogInterests, dogBreed, dogAgeForPref, dogEnergyLevel, dogWeight, distanceFromLocation, userAge, userProfessionsPref, userLatitude, userLongitude} = req.body

    const bodyForUser = {firstName, lastName, userEmail, hashedPassword, city, state, zipCode, age, profession, userInterests, userLatitude, userLongitude}

    const newUser = await User.create(bodyForUser)

    const bodyForDogs = {userId: newUser.id, dogName, breed, dogAge, energyLevel, weight, neutered, dogInterests}

    const bodyForPrompts = {userId: newUser.id, dogSpeak, favoriteActivityWithDog}

    const bodyForPreferences = {userId: newUser.id, dogBreed, dogAgeForPref, dogEnergyLevel, dogWeight, distanceFromLocation, userAge, userProfession: userProfessionsPref}

    await Dog.create(bodyForDogs)
    await Prompt.create(bodyForPrompts)
    await Preference.create(bodyForPreferences)

    await newSession.setUser(newUser);
    res.cookie('sid', newSession.sid, {
      maxAge: A_WEEK_IN_SECONDS,
      path: '/',
    });
    const newUserWithSession = await User.findOne({
      where: {
        id: newUser.id
      },
      include: [Session, Dog]
    })
    res.status(201).send(newUserWithSession)
  }
  catch (ex) {
      console.error(ex)
      res.send({
      message: 'Cannot register a new user'
    })
  }
})

router.delete('/:userId', async(req, res, next) => { // delete a user (api/users)
  try {
    if (req.user.id === Number(req.params.userId)){
      await User.destroy({where: {id: req.params.userId}})
      res.sendStatus(200)
    }
    else {
      res.send('You are unauthorized to access this.')
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }

})

router.put('/:userId', async(req, res, next) => { // update a user (api/users)
  try {
    if (req.user.id === Number(req.params.userId)){
      await Dog.update(req.body.dog, {
        where: {
          id: req.body.dog.id
        }
      })
      const withoutDog = req.body;
      delete withoutDog.dog

      await User.update(withoutDog, {
        where: {
          id: req.params.userId
        }
      })
      const updatedUser = await User.findOne({
        where: {
          id: req.params.userId
        }
      })
      res.send(updatedUser);
    }
  else {
    res.send('You are unauthorized to access this.')
  }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }

})

module.exports = router;
