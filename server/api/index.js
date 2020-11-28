const router = require('express').Router();

// create and import sub-api files as below
router.use('/auth', require('./auth'));

module.exports = router;
