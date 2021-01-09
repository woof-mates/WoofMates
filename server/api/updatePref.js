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
let prefVal
let updatedPref
let newPref
let name
let val

const updatePref = async(currUserPrefs, match, dog) => {
  let prefs = currUserPrefs.dataValues
  for (let trait in MATCH_PREF_WITH_SWIPING_ACT){
    switch (trait) {
      case 'dogBreed':
          prefVal = prefs.dogBreed[dog.breed] + 1
          updatedPref = prefs.dogBreed
          updatedPref[dog.breed] = prefVal
          newPref = {...updatedPref}
          //Not sure why this is necessary but it will not update without these three lines
          name = 'blank'
          val = newPref[name] + 1;
          newPref[name] = val;
          currUserPrefs.update({'dogBreed': newPref})
        break;
      case 'dogAgeForPref':
        prefVal = prefs.dogAgeForPref[dog.dogAge] + 1
        updatedPref = prefs.dogAgeForPref
        updatedPref[dog.dogAge] = prefVal
        newPref = {...updatedPref}
        //Not sure why this is necessary but it will not update without these three lines
        name = 'blank'
        val = newPref[name] + 1;
        newPref[name] = val;
        currUserPrefs.update({'dogAgeForPref': newPref})
        break;
      case 'dogEnergyLevel':
        prefVal = prefs.dogEnergyLevel[dog.energyLevel] + 1
        updatedPref = prefs.dogEnergyLevel
        updatedPref[dog.energyLevel] = prefVal
        newPref = {...updatedPref}
        //Not sure why this is necessary but it will not update without these three lines
        name = 'blank'
        val = newPref[name] + 1;
        newPref[name] = val;
        currUserPrefs.update({'dogEnergyLevel': newPref})
        break;
      case 'dogWeight':
        prefVal = prefs.dogWeight[dog.weight] + 1
        updatedPref = prefs.dogWeight
        updatedPref[dog.weight] = prefVal
        newPref = {...updatedPref}
        //Not sure why this is necessary but it will not update without these three lines
        name = 'blank'
        val = newPref[name] + 1;
        newPref[name] = val;
        currUserPrefs.update({'dogWeight': newPref})
        break;
      case 'userProfession':
        prefVal = prefs.userProfession[match.profession] + 1
        updatedPref = prefs.userProfession
        updatedPref[match.profession] = prefVal
        newPref = {...updatedPref}
        //Not sure why this is necessary but it will not update without these three lines
        name = 'blank'
        val = newPref[name] + 1;
        newPref[name] = val;
        currUserPrefs.update({'userProfession': newPref})
        break;
      case 'userAge':
        prefVal = prefs.userAge[match.age] + 1
        updatedPref = prefs.userAge
        updatedPref[match.age] = prefVal
        newPref = {...updatedPref}
        //Not sure why this is necessary but it will not update without these three lines
        name = 'blank'
        val = newPref[name] + 1;
        newPref[name] = val;
        currUserPrefs.update({'userAge': newPref})
        break;
      case 'userInterests':

        break;
      case 'dogInterests':

        break;
      default:
        // code block
    }
  }

}


module.exports = updatePref;
