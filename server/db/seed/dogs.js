const faker = require('faker')
const {BREEDS} = require('../../../constants')
const {getRandomInt} = require('../../../utils/mathFuncs')

const createDogs = (numUsers) => {
  let dogNames = [];
  let breeds = [];
  let dogAges = [];
  let energyLevels = [];
  let weights = [];
  let neutered = [];
  let dogInterests = [];
  let dogs = [];

  for (let i = 0; i < numUsers;i++){
    dogNames.push(faker.name.firstName())
    breeds.push(BREEDS[getRandomInt(BREEDS.length)])
    dogAges.push(getRandomInt(19) + 1)
    energyLevels.push(getRandomInt(5) + 1)
    weights.push(getRandomInt(100))
    neutered.push(getRandomInt(2))
    dogInterests.push([faker.lorem.sentences(), faker.lorem.sentences()])
  }

  for (let i = 0; i < numUsers;i++){
    dogs.push({});
    dogs[i].dogName = dogNames[i]
    dogs[i].breed = breeds[i]
    dogs[i].dogAge = dogAges[i]
    dogs[i].energyLevel = energyLevels[i]
    dogs[i].weight = weights[i]
    dogs[i].neutered = neutered[i]
    dogs[i].dogInterests = dogInterests[i]
    dogs[i].userId = i + 1
  }
  return dogs;
}

module.exports = createDogs;
