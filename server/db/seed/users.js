/* eslint-disable max-statements */
const faker = require('faker')
const {USER_INTERESTS, PROFESSIONS} = require('../../../constants')
const { saltAndHash } = require('../../../utils/hashPasswordFunc')

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const createUsers = (numUsers) => {
  let firstNames = [];
  let lastNames = [];
  let userEmails = [];
  let userImages1 = [];
  let userImages2 = [];
  let dogImages = [];
  let zipCodes = [];
  let city = [];
  let state = [];
  let userInterests = [];
  let age = [];
  let profession = [];
  let users = [];

  for (let i = 0; i < numUsers;i++){
    firstNames.push(faker.name.firstName())
    lastNames.push(faker.name.lastName())
    userEmails.push(faker.internet.email())
    userImages1.push(`https://placedog.net/500/280/sepia?id=${i}`)
    userImages2.push(faker.image.people())
    dogImages.push(`https://placedog.net/500/280/sepia?id=${i}`)
    zipCodes.push(parseInt(faker.address.zipCode()))
    city.push(faker.address.city())
    state.push(faker.address.stateAbbr())
    age.push(getRandomInt(100))
    profession.push(PROFESSIONS[getRandomInt(PROFESSIONS.length)])
    userInterests.push([USER_INTERESTS[getRandomInt(USER_INTERESTS.length)], USER_INTERESTS[getRandomInt(USER_INTERESTS.length)]])
  }

  for (let i = 0; i < numUsers;i++){
    users.push({});
    users[i].firstName = firstNames[i]
    users[i].lastName = lastNames[i]
    users[i].userEmail = userEmails[i]
    users[i].hashedPassword = saltAndHash(userEmails[i])
    users[i].userImage1 = userImages1[i]
    users[i].userImage2 = userImages2[i]
    users[i].dogImage = dogImages[i]
    users[i].zipCode = zipCodes[i]
    users[i].city = city[i]
    users[i].state = state[i]
    users[i].age = age[i]
    users[i].profession = profession[i]
    users[i].userInterests = userInterests[i]
  }
  return users;
}

module.exports = createUsers;
