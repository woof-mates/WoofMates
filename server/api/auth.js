const router = require('express').Router();
const { User, Session, Dog } = require('../db');
const bcrypt = require('bcrypt');
const { A_WEEK_IN_MILLISECONDS } = require('../../constants')

router.post('/login', async(req, res, next) => {
    try {
        const { userEmail, password } = req.body;
        const user = await User.findOne({
            where: {
                userEmail,
            },
            include: [Session, Dog],
        })
        // if userEmail has an account...
        if (user) {
            // first check password match with hashed pwd stored in db
            const comparisonResult = await bcrypt.compare(password, user.hashedPassword);
                if (!comparisonResult) {
                throw new Error('Wrong password!');
            }
            // if user already has a session, refresh the expiration date of cookie
            if (user.session) {
                res.cookie('sid', user.session.sid, {
                    maxAge: A_WEEK_IN_MILLISECONDS,
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
                    maxAge: A_WEEK_IN_MILLISECONDS,
                    path: '/',
                });
                const userWithNewSession = await User.findOne({
                    where: {
                      id: user.id
                    },
                    include: [Session, Dog],
                  })
                res.status(201).send(userWithNewSession)
            }
        }
        // if userEmail and password are not a match, send 404
        else res.sendStatus(404);
    } catch (err) { next(err); }
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
    } catch (err) { next(err); }
})

module.exports = router;
