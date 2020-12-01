const router = require('express').Router()
const { User, Session } = require('../db');

const A_WEEK_IN_SECONDS = 1000 * 60 * 60 * 24 * 7;

router.post('/login', async(req, res, next) => {
    try {
        const { userEmail, hashedPassword } = req.body;
        console.log(userEmail, hashedPassword)
        const user = await User.findOne({
            where: {
                userEmail,
                hashedPassword
            },
            include: [Session],
        })
        // if userEmail and password is a match...
        if (user) {
            // if user already has a session, refresh the expiration date of cookie
            if (user.session) {
                res.cookie('sid', user.session.sid, {
                    maxAge: A_WEEK_IN_SECONDS,
                    path: '/',
                });
                res.status(200).send(user)
            }
            // if user does not have a session, create a new session for the user
            else {
                const newSession = await Session.create();
                await newSession.setUser(user);
                await newSession.save()
                res.cookie('sid', newSession.sid, {
                    maxAge: A_WEEK_IN_SECONDS,
                    path: '/',
                });
                const userWithNewSession = await User.findOne({
                    where: {
                      id: user.id
                    },
                    include: [Session]
                  })
                res.status(201).send(userWithNewSession)
            }
        }
        // if userEmail and password are not a match, send 404
        else res.sendStatus(404);
    } catch(err) { next(err); }
});

router.delete('/logout/:userId', async(req, res, next) => {
    try {
        const { userId } = req.params;
        const userSession = await Session.findOne({
            where: {
                userId
            }
        });
        userSession.destroy();
        res.status(200).send( {message: 'You have been successfully logged out.'} )
    } catch(err) { next(err); }
})

module.exports = router;
