const {BREEDS} = require('../constants')

const createBreedsObjForPref = () => {
  let breedsObjForNewUser = {}
  for (let i=0; i<BREEDS.length; i++) {
    breedsObjForNewUser[BREEDS[i]] = 0;
  }
  return breedsObjForNewUser
}

module.exports = {createBreedsObjForPref}
