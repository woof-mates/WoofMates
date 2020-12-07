/* eslint-disable complexity */
/* eslint-disable no-undef */
/* eslint-disable guard-for-in */
const {favoriteTraits} = require('./favTraits')

const MATCH_PREF_WITH_USER = {
  userProfession: 'profession',
  userAge: 'age',
  userInterests: 'userInterests',
}

const MATCH_PREF_WITH_DOG = {
  dogBreed: 'breed',
  dogAgeForPref: 'dogAge',
  dogEnergyLevel: 'energyLevel',
  dogWeight: 'weight',
  isNeuteredDealbreaker: 'neutered',
}

const score = (user1FavTraits, user2) => {
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

module.exports = {score}
