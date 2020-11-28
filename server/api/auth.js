const router = require('express').Router()
const { User } = require('../db')

router.post('/login', async(req, res, next) => {
    try {
        const { userEmail, password } = req.body;
        const user = await User.findOne({
            where: {
                userEmail,
                password
            }
        })
        if (user) res.send(user)
        else res.sendStatus(404)
    } catch(err) { next(err); }
});

module.exports = router;