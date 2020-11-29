const router = require('express').Router()
const {User} = require('../db/index')

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
    const newUser = await User.create(req.body)
    res.status(201).send(newUser)
  }
  catch (ex) {
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
