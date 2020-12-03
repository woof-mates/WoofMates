const {BREEDS, DOG_AGES, MAX_DOG_ENERGY_LEVEL, MAX_DOG_WEIGHT} = require('../constants')


const createBreedsObjForPref = () => {
  let breedsObjForNewUser = {}
  for (let i=0; i<BREEDS.length; i++) {
    breedsObjForNewUser[BREEDS[i]] = 0;
  }
  return breedsObjForNewUser
}

const createAgesObjForPref = () => {
  let agesObjForNewUser = {}
  for (let i=0; i<DOG_AGES.length; i++) {
    agesObjForNewUser[DOG_AGES[i]] = 0;
  }
  return agesObjForNewUser
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
createWeightObjForPref}

