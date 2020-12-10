/* eslint-disable complexity */
/* eslint-disable no-undef */
/* eslint-disable guard-for-in */
// const {favoriteTraits} = require('./favTraits')

//Need to add UserAge and DogInterests
const VOTES_FOR_STATED_PREF = 100000000

const WEIGHTS_FOR_ALGO = {
  dogBreed: 150,
  dogAgeForPref: 5,
  dogEnergyLevel: 1,
  dogWeight: 20,
  userProfession: 3,
  userAge: 25,
  userInterests: 60
}

// const MATCH_PREF_WITH_USER = {
//   userProfession: 'profession',
//   userAge: 'age',
//   userInterests: 'userInterests',
// }

// const MATCH_PREF_WITH_DOG = {
//   dogBreed: 'breed',
//   dogAgeForPref: 'dogAge',
//   dogEnergyLevel: 'energyLevel',
//   dogWeight: 'weight'
// }

const MATCH_PREF_WITH_SWIPING_ACT = {
  dogBreed: 'dogBreed',
  dogAgeForPref: 'dogAgeForPref',
  dogEnergyLevel: 'dogEnergyLevel',
  dogWeight: 'dogWeight',
  userProfession: 'userProfession',
  userAge: 'userAge',
  userInterests: 'userInterests',
  dogInterests: 'dogInterests'
}

const MATCH_USERPREF_WITH_DOG = {
  dogBreedPref: 'breed',
  dogAgePref: 'dogAge',
  dogEnergyLevelPref: 'energyLevel',
  dogWeightPref: 'weight'
}

const MATCH_USERPREF_WITH_USER = {
  userProfessionsPref: 'profession',
  userAgePrefMinRange: 'age',
  userInterestsPref: 'userInterests'
}

const scoreActivity = (possibleMatch, currUser) => {
  const dog2 = possibleMatch.dog.dataValues
  const userSwipingActivity = currUser.preference.dataValues
  // console.log('in scoreActivity function, user passed in for evalution as a match is: ', user2)
  //calculate how much user1 will like user2
    let total = 0;
    for (let trait in MATCH_PREF_WITH_SWIPING_ACT){
      console.log(trait)
      switch (trait) {
        case 'dogBreed':
            console.log(userSwipingActivity[MATCH_PREF_WITH_SWIPING_ACT[trait]])
            total += (userSwipingActivity[MATCH_PREF_WITH_SWIPING_ACT[trait]] * WEIGHTS_FOR_ALGO[trait])
          break;
        case 'dogAgeForPref':
          if (prefTrait === dog2[MATCH_PREF_WITH_DOG[trait]]) {
            total += (prefTrait[MATCH_PREF_WITH_SWIPING_ACT[trait][prefTrait]] * WEIGHTS_FOR_ALGO[trait])
          }
          break;
        case 'dogEnergyLevel':
          if (prefTrait === dog2[MATCH_PREF_WITH_DOG[trait]]) {
            total += (prefTrait[MATCH_PREF_WITH_SWIPING_ACT[trait][prefTrait]] * WEIGHTS_FOR_ALGO[trait])
          }
          break;
        case 'dogWeight':
          if (prefTrait === dog2[MATCH_PREF_WITH_DOG[trait]]) {
            total += (prefTrait[MATCH_PREF_WITH_SWIPING_ACT[trait][prefTrait]] * WEIGHTS_FOR_ALGO[trait])
          }
          break;
        case 'userProfession':
          if (prefTrait === possibleMatch[MATCH_PREF_WITH_SWIPING_ACT[trait]]) {
            total += (prefTrait[MATCH_PREF_WITH_SWIPING_ACT[trait][prefTrait]] * WEIGHTS_FOR_ALGO[trait])
          }
          break;
        case 'userAge':
          if (prefTrait === possibleMatch[MATCH_PREF_WITH_SWIPING_ACT[trait]]) {
            total += (prefTrait[MATCH_PREF_WITH_SWIPING_ACT[trait][prefTrait]] * WEIGHTS_FOR_ALGO[trait])
          }
          break;
        case 'userInterests':
          for (let interest of possibleMatch[MATCH_PREF_WITH_SWIPING_ACT[trait]]){
            if (prefTrait === interest) {
              total += (prefTrait[MATCH_PREF_WITH_SWIPING_ACT[trait][prefTrait]] * WEIGHTS_FOR_ALGO[trait])
            }
          }
          break;
        case 'dogInterests':
          for (let interest of dog2[MATCH_PREF_WITH_SWIPING_ACT[trait]]) {
            if (prefTrait === interest) {
              total += (prefTrait[MATCH_PREF_WITH_SWIPING_ACT[trait][prefTrait]] * WEIGHTS_FOR_ALGO[trait])
            }
          }
          break;
        default:
          // code block
      }
    }
    return total;
}

// userAgePrefMinRange

const scorePreferences = (statedPreferences, possibleMatch, userDog) => {
  const dog2 = possibleMatch.dog.dataValues
  const usersDog = userDog
  //calculate how much user1 will like user2
    let total = 0;
    for (let key in statedPreferences){
      let statedPreference = statedPreferences[key];
      // console.log(key)
      switch (key) {
        case 'dogBreedPref':
          if (statedPreference === dog2[MATCH_USERPREF_WITH_DOG[key]]){total += VOTES_FOR_STATED_PREF}
          break;
        case 'dogAgePref':
          if (statedPreference === 'Same' && dog2[MATCH_USERPREF_WITH_DOG[key]] == usersDog[MATCH_USERPREF_WITH_DOG[key]]) {
            total += VOTES_FOR_STATED_PREF
          }
          else if (statedPreference === 'Younger' && dog2[MATCH_USERPREF_WITH_DOG[key]] < usersDog[MATCH_USERPREF_WITH_DOG[key]]) {
            total += VOTES_FOR_STATED_PREF
          }
          else if (statedPreference === 'Older' && dog2[MATCH_USERPREF_WITH_DOG[key]] > usersDog[MATCH_USERPREF_WITH_DOG[key]]) {
            total += VOTES_FOR_STATED_PREF
          }
          break;
        case 'dogEnergyLevelPref':
          if (parseInt(statedPreference) === dog2[MATCH_USERPREF_WITH_DOG[key]]){total += VOTES_FOR_STATED_PREF}
          break;
        case 'dogWeightPref':
          if (statedPreference === 'Same' && dog2[MATCH_USERPREF_WITH_DOG[key]] == usersDog[MATCH_USERPREF_WITH_DOG[key]]) {
            total += VOTES_FOR_STATED_PREF
          }
          else if (statedPreference === 'Larger' && dog2[MATCH_USERPREF_WITH_DOG[key]] > usersDog[MATCH_USERPREF_WITH_DOG[key]]) {
            total += VOTES_FOR_STATED_PREF
          }
          else if (statedPreference === 'Smaller' && dog2[MATCH_USERPREF_WITH_DOG[key]] < usersDog[MATCH_USERPREF_WITH_DOG[key]]) {
            total += VOTES_FOR_STATED_PREF
          }
          break;
        case 'userProfessionsPref':
          for (let profession of statedPreference){
            if (profession === possibleMatch[MATCH_USERPREF_WITH_USER[key]]){total += VOTES_FOR_STATED_PREF}
          }
          break;
        case 'userAgePrefMinRange':
          if (possibleMatch[MATCH_USERPREF_WITH_USER[key]] > statedPreference[key] && possibleMatch[MATCH_USERPREF_WITH_USER[key]] <= (statedPreference[key] + 9)) {
            total += VOTES_FOR_STATED_PREF
          }
          break;
        case 'userInterestsPref':
          for (let interest of possibleMatch[MATCH_USERPREF_WITH_USER[key]]){
            for (let statedInterest of statedPreference){
              if (statedInterest === interest){total += VOTES_FOR_STATED_PREF}
            }
          }
          break;
        default:
          // code block
      }
    }
    return total;
}

module.exports = {scoreActivity, scorePreferences}
