const {score} = require('./score')
const { User, Preference, Dog} = require('../db')

const findMatch = async (currUserId) => {
  //use score to return dog with highest score
  //Need to figure out how to filter out distance.  For now I am using city

  //Need to filter out users who have already been seen.  Need to talk to Fu.
  const currUser = (await User.findByPk(currUserId, { include: [Preference] })).dataValues
  const users = await User.findAll({
    where: {
      city: currUser.city,
      id: {
        [require('sequelize').Op.not]: currUser.id
      }
    },
    include: [Dog]
  })
  let highestScore = -1;
  let bestMatch = {};
  let currScore = 0;
  for (let possibleMatch of users){
    currScore = score(currUser, possibleMatch)
    if (currScore > highestScore){
      highestScore = currScore;
      bestMatch = possibleMatch;
    }
  }
  console.log(bestMatch.dataValues)
  console.log(`high score: ${highestScore}`)
  return bestMatch;

}

findMatch(1);
module.exports = {findMatch}
