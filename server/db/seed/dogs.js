const faker = require('faker')
const { DOG_INTERESTS } = require('../../../constants')
const { getRandomInt, getRandomIntBetween } = require('../../../utils/mathFuncs')

const createDogs = (numUsers) => {
  let dogNames = [];
  let breeds = ['Airedale Terrier', 'Golden Retriever', 'German Shepherd', 'Dalmatian', 'Shiba Inu'];
  let dogAges = [];
  let energyLevels = [];
  let weights = [];
  let neutered = [];
  let dogInterests = [];
  let dogs = [];

  for (let i = 0; i < numUsers;i++){
    dogNames.push(faker.name.firstName())
    dogAges.push(getRandomIntBetween(3, 13))
    energyLevels.push(getRandomInt(5) + 1)
    weights.push(getRandomIntBetween(60, 90))
    neutered.push(getRandomInt(2))
    dogInterests.push([DOG_INTERESTS[getRandomInt(DOG_INTERESTS.length)]])
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
