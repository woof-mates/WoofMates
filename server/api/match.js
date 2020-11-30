const router = require('express').Router();
const { User, Relationship, Dog } = require('../db')
// need to check why matches are going back to Wyman even after matching already!
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
            // all matches that this user has seen already
            const seenMatches = await Relationship.findAll({
                where: {
                    userId,
                }
            });
            // matches that are Matched where this user is under matchId
            const matchedMatches = await Relationship.findAll({
                where: { 
                    matchId: userId,
                    result: 'Matched'
                }
            })
            let seenOrMatchedMatchesId = []
            seenMatches.forEach(match => seenOrMatchedMatchesId.push(match.matchId))
            matchedMatches.forEach(match => seenOrMatchedMatchesId.push(match.userId))

            const allUsers = await User.findAll({ include: Dog });
            const unseenMatches = allUsers.filter(user => {
                return (!seenOrMatchedMatchesId.includes(user.id) && user.id !== userId*1)
            })
            // same as above, sending first of array for now
            res.send(unseenMatches[0])
        }
    } catch(err) { next(err) }
})

router.put('/:userId', async(req, res, next) => {
    try {
        const { userId } = req.params
        const { decision, matchId } = req.body
        console.log(decision, 'userid', userId, 'matchId', matchId)
        // first check to see if match has already liked user
        const existingRelationship = await Relationship.findOne({
            where:
                {
                    userId: matchId,
                    matchId: userId
                }
        })
        if(existingRelationship) {
            if (decision === 'like') {
                await existingRelationship.update({ result: 'Matched' })
            }
            if (decision === 'reject') {
                await existingRelationship.update({ result: 'MatchRejectedUser' })
            }
            res.send(existingRelationship);
        }
        // if match has not yet seen user, create a new relationship
        else {
                const result = decision === 'like' ? 'UserLikedMatch' : 'UserRejectedMatch'
                const newRelationship = await Relationship.create({
                    userId,
                    matchId,
                    result
                })
                res.send(newRelationship);
        }
    } catch(err) { next(err); }
})

module.exports = router;