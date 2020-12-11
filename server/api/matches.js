const router = require('express').Router();
const { User, Relationship, Dog } = require('../db')
const { Op } = require('sequelize')

router.get('/:userId', async(req,res,next) => {
    try {
        const { userId } = req.params
        
        //find all matches on relationship table where either userId or MatchId is the userId
        const allMatches = await Relationship.findAll({
            where: {
                [Op.or]: [
                    { matchId: userId },
                    { userId: userId}
                ],
                result: 'Matched'
            }
        });
        
        //if userId === userId, then send the matchId
        //if matchId === userId, then send the userId
        
        const listOfMatchedIds = [];
        
        allMatches.forEach(match => {
            
            if (match.userId === parseInt(userId)) {
                listOfMatchedIds.push(match.matchId) 
            } else {
                listOfMatchedIds.push(match.userId)
            }
        })
        
        res.send(listOfMatchedIds);

    } catch(err) { next(err) }
})

module.exports = router;