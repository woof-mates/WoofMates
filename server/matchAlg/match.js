const {score} = require('./score')
const {favoriteTraits} = require('./favTraits')
const chalk = require('chalk')
const {getRandomInt} = require('../../utils/mathFuncs')
// const { User, Preference, Dog} = require('../db')

const findMatch = async (currUser, users) => {
  //use score to return dog with highest score

  let highestScore = -1;
  let bestMatch = {};
  let currScore = 0;
  let random = getRandomInt(10) + 1;
  let isUserSpecifiedPref = false;
  if (random < 8) {
    isUserSpecifiedPref = true;
  }



  const favPreferences = await favoriteTraits(currUser);
  for (let possibleMatch of users){
    currScore = await score(favPreferences, possibleMatch)

    if (currScore > highestScore){
      highestScore = currScore;
      bestMatch = possibleMatch;
    }
    console.log(currScore)
  }

  return bestMatch;

}

// findMatch(1);
module.exports = {findMatch}
