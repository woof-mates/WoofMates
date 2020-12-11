const {scoreActivity, scorePreferences} = require('./score')
const chalk = require('chalk')
const {getRandomInt} = require('../../utils/mathFuncs')
// const User = require('../db/models/User')
//  const { User, Preference, Dog, Userpref} = require('../db')

const findMatch = (currUser, users) => {
// const findMatch = async (currUserId, user2Id) => {

  //use score to return dog with highest score
  // const currUser = await User.findByPk(currUserId, { include: [Preference, Userpref] })
  // const possibleMatch = await User.findByPk(user2Id, {include: [Dog]})
  // console.log(chalk.red('Possible Match'))
  // console.log(possibleMatch)
  let highestScore = -1;
  let bestMatch = {};
  let currScore = 0;
  let activityScore = 0;
  let statedPrefScore = 0;
  let random = getRandomInt(10) + 1;
  let isUserSpecifiedPref = false;
  if (random < 8) {
    isUserSpecifiedPref = true;
  }

  for (let possibleMatch of users){
    if (isUserSpecifiedPref) {
      const statedPreferences = currUser.userpref.dataValues;
      const userDog = currUser.dog.dataValues
      const scoreStatedPrefs = scorePreferences(statedPreferences, possibleMatch, userDog)
      statedPrefScore = scoreStatedPrefs;
    }
    activityScore = scoreActivity(possibleMatch, currUser)
    currScore = activityScore + statedPrefScore;
    // console.log(`activity score: ${activityScore}`)
    // console.log(`statedPrefScore: ${statedPrefScore}`)
    if (currScore > highestScore){
      highestScore = currScore;
      bestMatch = possibleMatch;
    }
    console.log(`currScore ${currScore}`)
  }
  return bestMatch;
}

// findMatch(1, 2);
module.exports = {findMatch}
