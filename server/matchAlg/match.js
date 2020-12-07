const {score} = require('./score')
const {favoriteTraits} = require('./favTraits')
const chalk = require('chalk')
// const { User, Preference, Dog} = require('../db')

const findMatch = async (currUser, users) => {
  //use score to return dog with highest score
  //Need to figure out how to filter out distance.  For now I am using city

  let highestScore = -1;
  let bestMatch = {};
  let currScore = 0;
  const favPreferences = await favoriteTraits(currUser);
  for (let possibleMatch of users){
    currScore = await score(favPreferences, possibleMatch)
    if (currScore > highestScore){
      highestScore = currScore;
      bestMatch = possibleMatch;
    }
  }

  return bestMatch;

}

// findMatch(1);
module.exports = {findMatch}
