const router = require('express').Router();

// create and import sub-api files as below
router.use('/users', require('./users')) // api/users route
router.use('/auth', require('./auth'));
router.use('/match', require('./match'));
router.use('/matches', require('./matches'));
router.use('/dogs', require('./dogs'));

router.use((req, res, next) => { //api
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})


module.exports = router;
