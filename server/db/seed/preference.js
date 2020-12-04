/* eslint-disable max-statements */
const {BREEDS, MAX_DOG_AGE, MAX_DOG_WEIGHT, PROFESSIONS, USER_INTERESTS, MAX_USER_AGE, MAX_DISTANCE_FROM_USER} = require('../../../constants')
const {getRandomInt} = require('../../../utils/mathFuncs')
const {setValObj, setNumericalObj} = require('../../../utils/dbFuncs')

const createPreferences = (numUsers, numVotes) => {
  let dogBreeds = [];
  let dogAges = [];
  let dogEnergyLevels = [];
  let dogWeights = [];
  let isNeuteredDealbreaker = [];
  let userInterests = [];
  let userAge = [];
  let userProfession = [];
  let distanceFromLocation = [];
  let preferences = [];

  for (let i = 0; i < numUsers;i++){
    dogBreeds.push(setValObj(BREEDS, numVotes))
    dogAges.push(setNumericalObj(MAX_DOG_AGE, numVotes))
    dogEnergyLevels.push(setNumericalObj(10, numVotes))
    dogWeights.push(setNumericalObj(MAX_DOG_WEIGHT, numVotes))
    // first user as broad as possible for match testing purposes
    if (i === 0) isNeuteredDealbreaker.push(false)
    else isNeuteredDealbreaker.push(getRandomInt(2))
    userInterests.push(setValObj(USER_INTERESTS, numVotes))
    userAge.push(setNumericalObj(MAX_USER_AGE, numVotes))
    userProfession.push(setValObj(PROFESSIONS, numVotes))
    // first user as broad as possible for match testing purposes
    if (i === 0) distanceFromLocation.push(MAX_DISTANCE_FROM_USER)
    else distanceFromLocation.push(getRandomInt(MAX_DISTANCE_FROM_USER)+1)
  }

  for (let i = 0; i < numUsers;i++){
    preferences.push({});
    preferences[i].dogBreed = dogBreeds[i]
    preferences[i].dogAge = dogAges[i]
    preferences[i].dogEnergyLevel = dogEnergyLevels[i]
    preferences[i].dogWeight = dogWeights[i]
    preferences[i].isNeuteredDealbreaker = isNeuteredDealbreaker[i]
    preferences[i].userInterests = userInterests[i]
    preferences[i].userAge = userAge[i]
    preferences[i].userProfession = userProfession[i]
    preferences[i].distanceFromLocation = distanceFromLocation[i]
    preferences[i].userId = i + 1
  }
  return preferences;
}

module.exports = createPreferences;
