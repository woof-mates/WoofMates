/* eslint-disable complexity */
/* eslint-disable no-undef */
/* eslint-disable guard-for-in */
const {favoriteTraits} = require('./favTraits')

//Need to add UserAge and DogInterests
const VOTES_FOR_STATED_PREF = 100000000

const MATCH_PREF_WITH_USER = {
  userProfession: 'profession',
  userAge: 'age',
  userInterests: 'userInterests'
}

const MATCH_PREF_WITH_DOG = {
  dogBreed: 'breed',
  dogAgeForPref: 'dogAge',
  dogEnergyLevel: 'energyLevel',
  dogWeight: 'weight'
}

const MATCH_USERPREF_WITH_DOG = {
  dogBreedPref: 'breed',
  dogAgePref: 'dogAge',
  dogEnergyLevelPref: 'energyLevel',
  dogWeightPref: 'weight'
}

const MATCH_USERPREF_WITH_USER = {
  userProfessionsPref: 'profession',
  // userAge: 'age',
  userInterestsPref: 'userInterests'
}

const scoreActivity = (user1FavTraits, user2) => {
  const dog2 = user2.dog.dataValues
  //calculate how much user1 will like user2
    let total = 0;
    for (let key in user1FavTraits){
      let user1FavTrait = user1FavTraits[key];
      switch (key) {
        case 'dogBreed':
          if (user1FavTrait === dog2[MATCH_PREF_WITH_DOG[key]]){total++}
          break;
        case 'dogAgeForPref':
          if (parseInt(user1FavTrait) === dog2[MATCH_PREF_WITH_DOG[key]]){total++}
          break;
        case 'dogEnergyLevel':
          if (parseInt(user1FavTrait) === dog2[MATCH_PREF_WITH_DOG[key]]){total++}
          break;
        case 'dogWeight':
          if (parseInt(user1FavTrait) === dog2[MATCH_PREF_WITH_DOG[key]]){total++}
          break;
        case 'userProfession':
          if (user1FavTrait === user2[MATCH_PREF_WITH_USER[key]]){total++}
          break;
        case 'userAge':
          if (parseInt(user1FavTrait) === user2[MATCH_PREF_WITH_USER[key]]){total++}
          break;
        case 'userInterests':
          for (let interest of user2[MATCH_PREF_WITH_USER[key]]){
            if (user1FavTrait === interest){total++}
          }
          break;
        default:
          // code block
      }
    }
    return total;
}

const scorePreferences = (statedPreferences, user2) => {
  const dog2 = user2.dog.dataValues
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
          if (parseInt(statedPreference) === dog2[MATCH_USERPREF_WITH_DOG[key]]){total += VOTES_FOR_STATED_PREF}
          break;
        case 'dogEnergyLevelPref':
          if (parseInt(statedPreference) === dog2[MATCH_USERPREF_WITH_DOG[key]]){total += VOTES_FOR_STATED_PREF}
          break;
        case 'dogWeightPref':
          if (parseInt(statedPreference) === dog2[MATCH_USERPREF_WITH_DOG[key]]){total += VOTES_FOR_STATED_PREF}
          break;
        case 'userProfessionsPref':
          for (let profession of statedPreference){
            if (profession === user2[MATCH_USERPREF_WITH_USER[key]]){total += VOTES_FOR_STATED_PREF}
          }
          break;
        // case 'userAge':
        //   if (parseInt(statedPreference) === user2[MATCH_USERPREF_WITH_USER[key]]){total++}
        //   break;
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
