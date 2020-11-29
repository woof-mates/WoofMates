const router = require('express').Router();
const { User, Relationship, Dog } = require('../db')

router.get('/:userId', async(req,res,next) => {
    try {
        const { userId } = req.params
        // first find matches that have already liked this user
        const matchesAlreadyLikedUser = await Relationship.findAll({
            where: {
                matchId: userId,
                result: 'UserLikedMatch'
            }
        });
        // send one match at a time so algo can update with each decision by user
        // sending 1st element in matches array for now, but this would be sorted based on algorithm
        if(matchesAlreadyLikedUser.length) {
            const matchToSendId = matchesAlreadyLikedUser[0].userId;
            const matchToSend = await User.findByPk(matchToSendId, { include: [Dog] })
            res.send(matchToSend)
        }
        // if there are no matches that have already liked this user...
        else {
            const seenMatches = await Relationship.findAll({
                where: {
                    userId
                }
            });
            let seenMatchesId = []
            seenMatches.forEach(match => seenMatchesId.push(match.matchId))
            const allUsers = await User.findAll({ include: Dog });
            const unseenMatches = allUsers.filter(user => {
                return (!seenMatchesId.includes(user.id) && user.id !== userId*1)
            })
            // same as above, sending first of array for now
            res.send(unseenMatches[0])
        }
    } catch(err) { next(err) }
})

module.exports = router;