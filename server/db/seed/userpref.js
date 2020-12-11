const { BREEDS, USER_INTERESTS, PROFESSIONS, DOG_AGE_PREFS, DOG_WEIGHT_PREFS } = require('../../../constants')
const { getRandomInt } = require('../../../utils/mathFuncs')

// eslint-disable-next-line max-statements
const createUserprefs = (numUsers) => {
    let dogBreedPref = [];
    let dogAgePref = [];
    let dogEnergyLevelPref = [];
    let dogWeightPref = [];
    let userAgePrefMinRange = [];
    let userProfessionsPref = [];
    let userInterestsPref = [];
    let userprefs = [];

    for (let i = 0; i < numUsers; i++) {
        dogBreedPref.push(BREEDS[getRandomInt(BREEDS.length)])
        dogAgePref.push(DOG_AGE_PREFS[getRandomInt(DOG_AGE_PREFS.length)])
        dogEnergyLevelPref.push(getRandomInt(5) + 1)
        dogWeightPref.push(DOG_WEIGHT_PREFS[getRandomInt(DOG_WEIGHT_PREFS.length)])
        userAgePrefMinRange.push(getRandomInt(10) * 10)
        const professionsIndex = getRandomInt(PROFESSIONS.length - 1)
        userProfessionsPref.push([PROFESSIONS[professionsIndex], PROFESSIONS[professionsIndex + 1]])
        const userInterestsIndex = getRandomInt(USER_INTERESTS.length - 1)
        userInterestsPref.push([USER_INTERESTS[userInterestsIndex], USER_INTERESTS[userInterestsIndex + 1]])
    }

    for (let i = 0; i < numUsers; i++) {
        userprefs.push({})
        userprefs[i].dogBreedPref = dogBreedPref[i]
        userprefs[i].dogAgePref = dogAgePref[i]
        userprefs[i].dogEnergyLevelPref = dogEnergyLevelPref[i]
        userprefs[i].dogWeightPref = dogWeightPref[i]
        userprefs[i].userAgePrefMinRange = userAgePrefMinRange[i]
        userprefs[i].userProfessionsPref = userProfessionsPref[i]
        userprefs[i].userInterestsPref = userInterestsPref[i]
        userprefs[i].userId = i + 1
    }
    return userprefs;
}

module.exports = createUserprefs;
