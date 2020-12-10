/* eslint-disable max-statements */
const router = require('express').Router();
const nodemailer = require('nodemailer');
const { User, Relationship, Dog, Preference, Userpref } = require('../db')
const { getDistance }  = require('../../utils/mathFuncs')
const {findMatch} = require('../../server/matchAlg/match')

router.get('/:userId', async(req, res, next) => {
    // console.logs left in intentionally for testing purposes
    try {
        const { userId } = req.params
        const { userLatitude, userLongitude } = req.query

        const userPreferences = await Preference.findOne({
            where: {
                userId
            }
        });
        const currUser = (await User.findByPk(userId, { include: [Preference, Userpref, Dog] })).dataValues

        const { distanceFromLocation, isNeuteredDealbreaker } = userPreferences;
        // console.log('user prefs: distance', distanceFromLocation, 'neutereddealbreaker', isNeuteredDealbreaker)
        const allUsers = await User.findAll({ include: [Dog, Preference] });

        // function to filter matches with upfront user-specified filters
        const filterMatchesWithUserSpecifiedFilters = (matchArray) => {
            let filteredMatchArray = [];
            for (let i = 0; i < matchArray.length; i++){
                const match = matchArray[i]
                // logs for debugging; can be deleted later
                // console.log('latlongs',userLatitude * 1, userLongitude * 1, match.userLatitude * 1, match.userLongitude * 1)
                // console.log('matchId', match.id, 'Userdistancefrommatch:', (getDistance(userLatitude * 1, userLongitude * 1, match.userLatitude * 1, match.userLongitude * 1)))
                // if (isNeuteredDealbreaker) console.log('neutered is a dealbreaker, matchDog is neutered:', match.dog.neutered)

                if (getDistance(userLatitude * 1, userLongitude * 1, match.userLatitude * 1, match.userLongitude * 1) <= distanceFromLocation
                && (isNeuteredDealbreaker && match.dog.neutered || isNeuteredDealbreaker === false)) filteredMatchArray.push(match)
            }
            return filteredMatchArray;
        }

        // first find relationships with matches that have already liked this user
        let matchesAlreadyLikedUserRelationships = await Relationship.findAll({
            where: {
                matchId: userId,
                result: 'UserLikedMatch'
            }
        });

        let matchesAlreadyLikedUser = [];
        if (matchesAlreadyLikedUserRelationships.length) {
            // create an array that contains ids of matches that already liked this user
            const matchesAlreadyLikedUserIds = matchesAlreadyLikedUserRelationships.reduce((acc, relp) => {
                acc.push(relp.userId)
                return acc
            }, []);
            // console.log('matches already liked userIDs', matchesAlreadyLikedUserIds)
            // create array of Matches based on the match id array from above
            matchesAlreadyLikedUser = allUsers.filter(user => matchesAlreadyLikedUserIds.includes(user.id));
            // filter these matches with user specified filters using function defined above
            matchesAlreadyLikedUser = filterMatchesWithUserSpecifiedFilters(matchesAlreadyLikedUser)
            // console.log('matches already liked user after filtering:')
            // matchesAlreadyLikedUser.forEach(match => console.log(match.id))
        }
        // if after filtering by user-specified filters, matches still remain...
        if (matchesAlreadyLikedUser.length) {
            // console.log('here')
            // send one match at a time so algo can update with each decision by user
            // sending 1st element in matches array for now, but this would be sorted based on algorithm
            const bestMatch = await findMatch(currUser, matchesAlreadyLikedUser)
            res.send(bestMatch)
            }
        // if there are no filtered matches that have already liked this user...
        else {
            // first find IDs of matches that this user should not see in their feed, defined 2 ways:
            // all matches that this user has seen already
            const seenMatches = await Relationship.findAll({
                where: {
                    userId,
                }
            });
            // users that have already seen this user as a match
            // we check for UserLikedMatch above so don't need result condition; we may get UserLikedMatch that were filtered out based on user-specified prefs but those will be filtered out again below
            const matchesThatHaveSeenThisUser = await Relationship.findAll({
                where: {
                    matchId: userId,
                }
            })
            let matchesToExcludeId = []
            seenMatches.forEach(match => matchesToExcludeId.push(match.matchId))
            matchesThatHaveSeenThisUser.forEach(match => matchesToExcludeId.push(match.userId))

            let unseenMatches = allUsers.filter(user => {
                return (!matchesToExcludeId.includes(user.id) && user.id !== userId * 1)
            })
            // console.log('n of unseenmatchesbeforefilter', unseenMatches.length)
            unseenMatches = filterMatchesWithUserSpecifiedFilters(unseenMatches)

            // console.log('showing filtered matches below, user prefs here: distance', distanceFromLocation, 'neutereddealbreaker', isNeuteredDealbreaker)
            unseenMatches.forEach(match => {
                // console.log('FilteredMatchId:', match.id, 'userDistanceFromMatch:', getDistance(userLatitude * 1, userLongitude * 1, match.userLatitude * 1, match.userLongitude * 1))
                // if (isNeuteredDealbreaker) console.log('Neutered is a deal breaker, matchdog neutered:', match.dog.neutered)
            })

            // same as above, sending first of array for now
            // if (!unseenMatches.length) res.send( { message: 'You have no matches that fit your criteria. Try broadening it in your settings!'})
            const bestMatch = await findMatch(currUser, unseenMatches)
            res.send(bestMatch)
        }
    } catch (err) { next(err) }
})

router.put('/:userId', async(req, res, next) => {
    try {
        const { userId } = req.params
        const { decision, matchId } = req.body
        // console.log(decision, 'userid', userId, 'matchId', matchId)
        // first check to see if match has already liked user
        const existingRelationship = await Relationship.findOne({
            where:
                {
                    userId: matchId,
                    matchId: userId
                }
        })
        if (existingRelationship) {
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
    } catch (err) { next(err); }
})

router.post('/email', async (req, res, next) => {
    try {
        const { matchEmail, matchEmailText } = req.body;
        // console.log(matchEmail, matchEmailText)
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'woofmates.matching@gmail.com', // generated ethereal user
            pass: 'Woofmates123', // generated ethereal password
        },
        });
        // send mail with defined transport object
        const info = await transporter.sendMail({
        from: '"WoofMates 🐶" <graceshockers@gmail.com>',
        to: matchEmail,
        subject: 'You have a new match!!',
        html: matchEmailText,
        });

        console.log('Message sent: %s', info.messageId);
        res.sendStatus(200);
    } catch (err) { next(err); }
});

module.exports = router;
