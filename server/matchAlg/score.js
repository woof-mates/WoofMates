/* eslint-disable complexity */
/* eslint-disable no-undef */
/* eslint-disable guard-for-in */

const { AGE_RANGE } = require('../../constants')
const VOTES_FOR_STATED_PREF = 100000000

const WEIGHTS_FOR_ALGO = {
  dogBreed: 150,
  dogAgeForPref: 5,
  dogEnergyLevel: 1,
  dogWeight: 20,
  userProfession: 3,
  userAge: 25,
  userInterests: 60,
  dogInterests: 2
}

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
  //calculate how much user1 will like user2
    let total = 0;
    for (let trait in MATCH_PREF_WITH_SWIPING_ACT){
      switch (trait) {
        case 'dogBreed':
          total += (parseInt(userSwipingActivity.dogBreed[possibleMatch.dog.dataValues.breed]) * WEIGHTS_FOR_ALGO[trait])
          break;
        case 'dogAgeForPref':
          total += (parseInt(userSwipingActivity.dogAgeForPref[possibleMatch.dog.dataValues.dogAge]) * WEIGHTS_FOR_ALGO[trait])
          break;
        case 'dogEnergyLevel':
          total += (parseInt(userSwipingActivity.dogEnergyLevel[possibleMatch.dog.dataValues.energyLevel]) * WEIGHTS_FOR_ALGO[trait])
          break;
        case 'dogWeight':
          total += (parseInt(userSwipingActivity.dogWeight[possibleMatch.dog.dataValues.weight]) * WEIGHTS_FOR_ALGO[trait])
          break;
        case 'userProfession':
          total += (parseInt(userSwipingActivity.userProfession[possibleMatch.dataValues.profession]) * WEIGHTS_FOR_ALGO[trait])
          break;
        case 'userAge':
          total += (parseInt(userSwipingActivity.userAge[possibleMatch.dataValues.age]) * WEIGHTS_FOR_ALGO[trait])
          break;
        case 'userInterests':
          for (let interest of possibleMatch.dataValues.userInterests){
            total += (parseInt(userSwipingActivity.userInterests[interest]) * WEIGHTS_FOR_ALGO[trait])
          }
          break;
        case 'dogInterests':
          for (let interest of dog2.dogInterests) {
            total += (parseInt(userSwipingActivity.dogInterests[interest]) * WEIGHTS_FOR_ALGO[trait])
          }
          break;
        default:
          // code block
      }
    }
    return total;
}

const scorePreferences = (statedPreferences, possibleMatch, userDog) => {
  const dog2 = possibleMatch.dog.dataValues
  const usersDog = userDog
  //calculate how much user1 will like user2
    let total = 0;
    for (let key in statedPreferences){
      let statedPreference = statedPreferences[key];
      switch (key) {
        case 'dogBreedPref':
          if (statedPreference === dog2[MATCH_USERPREF_WITH_DOG[key]]){total += VOTES_FOR_STATED_PREF}
          break;
        case 'dogAgePref':
          if (statedPreference === 'Same' && dog2[MATCH_USERPREF_WITH_DOG[key]] === usersDog[MATCH_USERPREF_WITH_DOG[key]]) {
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
          if (statedPreference === 'Same' && dog2[MATCH_USERPREF_WITH_DOG[key]] === usersDog[MATCH_USERPREF_WITH_DOG[key]]) {
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
          if (statedPreference) {
            for (let profession of statedPreference){
              if (profession === possibleMatch[MATCH_USERPREF_WITH_USER[key]]){total += VOTES_FOR_STATED_PREF}
            }
          }
          break;
        case 'userAgePrefMinRange':
          if (possibleMatch[MATCH_USERPREF_WITH_USER[key]] > statedPreference && possibleMatch[MATCH_USERPREF_WITH_USER[key]] <= (statedPreference + AGE_RANGE)) {
            total += VOTES_FOR_STATED_PREF
          }
          break;
        case 'userInterestsPref':
          if (statedPreference) {
            for (let interest of possibleMatch[MATCH_USERPREF_WITH_USER[key]]){
              for (let statedInterest of statedPreference){
                if (statedInterest === interest){total += VOTES_FOR_STATED_PREF}
              }
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
