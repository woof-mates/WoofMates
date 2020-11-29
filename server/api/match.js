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
        if(matchesAlreadyLikedUser) {
            const matchToSendId = matchesAlreadyLikedUser[0].userId;
            const matchToSend = await User.findByPk(matchToSendId, { include: [Dog] })
            res.send(matchToSend)
        }
        else {
            const unseenMatches = await User.findAll({
                where: {
                    '$Relationship.userId$': userId
                },
                include: [{
                    model: Relationship,
                    required: false
                }],
            })
            res.send(unseenMatches[0])
        }
    } catch(err) { next(err) }
})

module.exports = router;