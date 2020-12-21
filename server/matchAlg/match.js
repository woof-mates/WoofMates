const {scoreActivity, scorePreferences} = require('./score')
const {getRandomInt} = require('../../utils/mathFuncs')

const findMatch = (currUser, users) => {
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
  console.log('user specified pref used', isUserSpecifiedPref)
  for (let possibleMatch of users){
    if (isUserSpecifiedPref) {
      const statedPreferences = currUser.userpref.dataValues;
      const userDog = currUser.dog.dataValues
      const scoreStatedPrefs = scorePreferences(statedPreferences, possibleMatch, userDog)
      statedPrefScore = scoreStatedPrefs;
    }
    activityScore = scoreActivity(possibleMatch, currUser)
    currScore = activityScore + statedPrefScore;
    if (currScore > highestScore){
      highestScore = currScore;
      bestMatch = possibleMatch;
    }
  }
  return bestMatch;
}

module.exports = {findMatch}
