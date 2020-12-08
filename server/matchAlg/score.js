/* eslint-disable complexity */
/* eslint-disable no-undef */
/* eslint-disable guard-for-in */
const {favoriteTraits} = require('./favTraits')

//Need to add UserAge and DogInterests
const VOTES_FOR_STATED_PREF = 100000000

const MATCH_PREF_WITH_USER = {
  userProfession: 'profession',
  userAge: 'age',
  userInterests: 'userInterests',
}

const MATCH_PREF_WITH_DOG = {
  dogBreed: 'breed',
  dogAgeForPref: 'dogAge',
  dogEnergyLevel: 'energyLevel',
  dogWeight: 'weight'
}

const MATCH_PREF_WITH_SWIPING_ACT = {
  dogBreed: 'dogBreed',
  dogAgeForPref: 'dogAgeForPref',
  dogEnergyLevel: 'dogEnergyLevel',
  dogWeight: 'dogWeight',
  userProfession: 'userProfession',
  userAge: 'userAge',
  userInterests: 'userInterests'
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

const scoreActivity = (user1FavTraits, user2, currUser) => {
  const dog2 = user2.dog.dataValues
  const userSwipingActivity = currUser.preference.dataValues
  console.log('in scoreActivity function, user passed in for evalution as a match is: ', user2)
  //calculate how much user1 will like user2
    let total = 0;
    for (let key in user1FavTraits){
      let user1FavTrait = user1FavTraits[key];
      switch (key) {
        case 'dogBreed':
          if (user1FavTrait === dog2[MATCH_PREF_WITH_DOG[key]]) {
            total += userSwipingActivity[MATCH_PREF_WITH_SWIPING_ACT[key][user1FavTrait]]
          }
          break;
        case 'dogAgeForPref':
          if (user1FavTrait === dog2[MATCH_PREF_WITH_DOG[key]]) {
            total += userSwipingActivity[MATCH_PREF_WITH_SWIPING_ACT[key][user1FavTrait]]
          }
          break;
        case 'dogEnergyLevel':
          if (user1FavTrait === dog2[MATCH_PREF_WITH_DOG[key]]) {
            total += userSwipingActivity[MATCH_PREF_WITH_SWIPING_ACT[key][user1FavTrait]]
          }
          break;
        case 'dogWeight':
          if (user1FavTrait === dog2[MATCH_PREF_WITH_DOG[key]]) {
            total += userSwipingActivity[MATCH_PREF_WITH_SWIPING_ACT[key][user1FavTrait]]
          }
          break;
        case 'userProfession':
          if (user1FavTrait === user2[MATCH_PREF_WITH_SWIPING_ACT[key]]) {
            total += userSwipingActivity[MATCH_PREF_WITH_SWIPING_ACT[key][user1FavTrait]]
          }
          break;
        case 'userAge':
          if (user1FavTrait === user2[MATCH_PREF_WITH_SWIPING_ACT[key]]) {
            total += userSwipingActivity[MATCH_PREF_WITH_SWIPING_ACT[key][user1FavTrait]]
          }
          break;
        case 'userInterests':
          for (let interest of user2[MATCH_PREF_WITH_SWIPING_ACT[key]]){
            if (user1FavTrait === interest) {
              total += userSwipingActivity[MATCH_PREF_WITH_SWIPING_ACT[key][user1FavTrait]]
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

const scorePreferences = (statedPreferences, user2, userDog) => {
  const dog2 = user2.dog.dataValues
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
            if (profession === user2[MATCH_USERPREF_WITH_USER[key]]){total += VOTES_FOR_STATED_PREF}
          }
          break;
        case 'userAgePrefMinRange':
          if (user2[MATCH_USERPREF_WITH_USER[key]] > statedPreference[key] && user2[MATCH_USERPREF_WITH_USER[key]] <= (statedPreference[key] + 9)) {
            total += VOTES_FOR_STATED_PREF
          }
          break;
        case 'userInterestsPref':
          for (let interest of user2[MATCH_USERPREF_WITH_USER[key]]){
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
