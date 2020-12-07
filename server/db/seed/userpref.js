const { BREEDS, USER_INTERESTS, PROFESSIONS, DOG_AGE_PREFS, DOG_WEIGHT_PREFS } = require('../../../constants')
const { getRandomInt } = require('../../../utils/mathFuncs')

const createUserprefs = (numUsers) => {
    let dogBreedPref = [];
    let dogAgePref = [];
    let dogEnergyLevelPref = [];
    let dogWeightPref = [];
    let userAgePref = [];
    let userProfessionsPref = [];
    let userInterestsPref = [];
    let userprefs = []

    for (let i = 0; i < numUsers.length; i++) {
        dogBreedPref.push(getRandomInt(BREEDS.length))
        dogAgePref.push(DOG_AGE_PREFS[getRandomInt(DOG_AGE_PREFS.length)])
        dogEnergyLevelPref.push(getRandomInt(6))
        dogWeightPref.push(DOG_WEIGHT_PREFS[getRandomInt(DOG_WEIGHT_PREFS.length)])
        userAgePref.push(getRandomInt(10) * 10)
        userProfessionsPref.push(PROFESSIONS[getRandomInt(PROFESSIONS.length)])
        userInterestsPref.push(USER_INTERESTS[getRandomInt(USER_INTERESTS.length)])
    }

    for (let i = 0; i < numUsers.length; i++) {
        userprefs.push({})
        userprefs[i].dogBreedPref = dogBreedPref[i]
        userprefs[i].dogAgePref = dogAgePref[i]
        userprefs[i].dogEnergyLevelPref = dogEnergyLevelPref[i]
        userprefs[i].dogWeightPref = dogWeightPref[i]
        userprefs[i].userAgePref = userAgePref[i]
        userprefs[i].userProfessionsPref = userProfessionsPref[i]
        userprefs[i].userInterestsPref = userInterestsPref[i]
    }
}

module.exports = createUserprefs;
