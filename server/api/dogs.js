const router = require('express').Router()
const { Dog } = require('../db/index')

router.get('/', async(req, res, next) => { // api/dogs
  try {
    res.send(await Dog.findAll());
  }
  catch (ex) {
    next (ex)
  }
})

module.exports = router;
