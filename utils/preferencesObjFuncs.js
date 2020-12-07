const {BREEDS, DOG_AGES, MAX_DOG_ENERGY_LEVEL, MAX_DOG_WEIGHT, MAX_USER_AGE, PROFESSIONS} = require('../constants')


const createBreedsObjForPref = () => {
  let breedsObjForNewUser = {}
  for (let i=0; i<BREEDS.length; i++) {
    breedsObjForNewUser[BREEDS[i]] = 0;
  }
  return breedsObjForNewUser
}

const createAgesObjForPref = () => {
  let agesPrefObjForNewUser = {}
  for (let i=0; i<DOG_AGES.length; i++) {
    agesPrefObjForNewUser[DOG_AGES[i]] = 0;
  }
  return agesPrefObjForNewUser
}

const createUserAgesObjForPref = () => {
  let agesObjForNewUser = {}
  for (let i=1; i<=MAX_USER_AGE; i++) {
    agesObjForNewUser[[i]] = 0;
  }
  return agesObjForNewUser
}

const createProfessionsObjForPref = () => {
  let professionsPrefObjForNewUser = {}
  for (let i=0; i<PROFESSIONS.length; i++) {
    professionsPrefObjForNewUser[PROFESSIONS[i]] = 0;
  }
  return professionsPrefObjForNewUser
}

const createEnergyLevelObjForPref = () => {
  let energyLevelObjForNewUser = {}
  for (let i=1; i<=MAX_DOG_ENERGY_LEVEL; i++) {
    energyLevelObjForNewUser[[i]] = 0;
  }
  return energyLevelObjForNewUser
}

const createWeightObjForPref = () => {
  let weightObjForNewUser = {}
  for (let i=1; i<=MAX_DOG_WEIGHT; i++) {
    weightObjForNewUser[[i]] = 0;
  }
  return weightObjForNewUser
}

module.exports = {createBreedsObjForPref, createAgesObjForPref, createEnergyLevelObjForPref,
createWeightObjForPref, createUserAgesObjForPref, createProfessionsObjForPref}

