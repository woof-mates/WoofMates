const router = require('express').Router();
const { User, Session, Preference, Dog, Prompt, Userpref } = require('../db/index');
const { saltAndHash } = require('../../utils/hashPasswordFunc');
const { A_WEEK_IN_MILLISECONDS } = require('../../constants')

router.get('/', async(req, res, next) => { // api/users
  try {
    res.send(await User.findAll({
      attributes: {
        exclude: ['hashedPassword']
      }
    }));
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
      const userProfile = await User.findOne({
        where: {
          id: req.params.userId
        },
        include: [Preference, Dog],
        attributes: {
          exclude: ['hashedPassword']
        }
      });
      res.send(userProfile)
  }
  catch (ex) {
    next(ex)
  }
})

router.post('/register', async(req, res, next) => { // register a user (api/users/register)
  try {
    console.log('trying to create a new user')

    const newSession = await Session.create()

    const { firstName, lastName, userEmail, password, city, state, zipCode, age, profession, userInterests, dogSpeak, favoriteActivityWithDog, dogName, breed, dogAge, energyLevel, weight, neutered, dogInterests, dogBreedPref, dogAgePref, dogEnergyLevelPref, dogWeightPref, distanceFromLocation, userAgePrefMinRange, userProfessionsPref, userInterestsPref, userLatitude, userLongitude, isNeuteredDealbreaker, userImage1, dogImage } = req.body

    const hashedPassword = await saltAndHash(password)

    const bodyForUser = {firstName, lastName, userEmail, hashedPassword, city, state, zipCode, age, profession, userInterests, userLatitude, userLongitude, userImage1, dogImage}

    const newUser = await User.create(bodyForUser)

    const bodyForDogs = {userId: newUser.id, dogName, breed, dogAge, energyLevel, weight, neutered, dogInterests}

    const bodyForPrompts = {userId: newUser.id, dogSpeak, favoriteActivityWithDog}

    const bodyForPreferences = {userId: newUser.id, distanceFromLocation, isNeuteredDealbreaker }

    const bodyForUserprefs = {userId: newUser.id, dogBreedPref, dogAgePref, dogEnergyLevelPref, dogWeightPref, userAgePrefMinRange, userProfessionsPref, userInterestsPref}

    await Dog.create(bodyForDogs)
    await Prompt.create(bodyForPrompts)
    await Preference.create(bodyForPreferences)
    await Userpref.create(bodyForUserprefs)

    await newSession.setUser(newUser);
    res.cookie('sid', newSession.sid, {
      maxAge: A_WEEK_IN_MILLISECONDS,
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
      await User.destroy({where: {id: req.params.userId}})
      res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }

})

router.put('/:userId', async(req, res, next) => { // update a user (api/users)
  try {
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
    catch (error) {
    console.log(error)
    res.sendStatus(500)
  }

})

module.exports = router;
