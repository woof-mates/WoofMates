const router = require('express').Router()
const { User, Session, Preference } = require('../db/index')

const A_WEEK_IN_SECONDS = 1000 * 60 * 60 * 24 * 7;

router.get('/', async(req, res, next) => { // api/users
  try {
    res.send(await User.findAll());
  }
  catch (ex) {
    next (ex)
  }
})

router.get('/:userId', async(req, res, next) => { // single user profile
  try {
    const userProfile = await User.findOne({
      where: {
        id: req.params.userId
      },
      include: [Preference]
    });
    res.send(userProfile)
  }
  catch (ex) {
    next (ex)
  }
})

router.post('/register', async(req,res,next) => { // register a user (api/users/register)
  try {
    console.log('trying to create a new user')
    const newSession = await Session.create()
    const newUser = await User.create(req.body)
    await newSession.setUser(newUser);
    res.cookie('sid', newSession.sid, {
      maxAge: A_WEEK_IN_SECONDS,
      path: '/',
    });
    const newUserWithSession = await User.findOne({
      where: {
        id: newUser.id
      },
      include: [Session]
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

router.delete('/:userId', async(req,res,next) => { // delete a user (api/users)
  try {
    await User.destroy({where: {id: req.params.userId}})
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }

})

module.exports = router;
