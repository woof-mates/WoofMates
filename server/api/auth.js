const router = require('express').Router()

router.post('/login', async(req, res, next) => {
    try {
        console.log('hello')
        const { userEmail, password } = req.body;
        console.log('logininfo',userEmail, password)
        res.sendStatus(200)
    } catch(err) { next(err); }
});

module.exports = router;