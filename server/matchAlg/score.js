const {favoriteTraits} = require('./favTraits')

const MATCH_PREF_WITH_USER = {
  profession: 'profession',
  age: 'age',
  userInterests: 'userInterests',
}

const MATCH_PREF_WITH_DOG = {
  dogBreed: 'breed',
  dogAge: 'dogAge',
  dogEnergyLevel: 'energyLevel',
  dogWeigth: 'weight',
  isNeuteredDealbreaker: 'neutered',
}

const score = (user1, user2) => {
  //calculate how much user1 will like user2
    const user1FavTraits = favoriteTraits(user1);
    const dog2 = user2.dog.dataValues
    let total = 0;
    for (let key in user1FavTraits){
      if (MATCH_PREF_WITH_USER[key]){
        //user traits
        if (user1FavTraits[key] === user2[MATCH_PREF_WITH_USER[key]]){total++;}
      }
      else if (user1FavTraits[key] === dog2[MATCH_PREF_WITH_DOG[key]]){
        //dog traits
        total++;
      }
    }
    return total;
}

module.exports = {score}
