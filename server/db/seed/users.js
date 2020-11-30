const faker = require('faker')

const createUsers = (numUsers) => {
  let firstNames = [];
  let lastNames = [];
  let userEmails = [];
  let hashedPasswords = [];
  let userImages1 = [];
  let userImages2 = [];
  let dogImages = [];
  let zipCodes = [];
  let userInterests = [];
  let users = [];

  for(let i = 0; i<numUsers;i++){
    firstNames.push(faker.name.firstName())
    lastNames.push(faker.name.lastName())
    userEmails.push(faker.internet.email())
    hashedPasswords.push(faker.internet.password())
    userImages1.push(`https://placedog.net/500/280/sepia?id=${i}`)
    userImages2.push(faker.image.people())
    dogImages.push(`https://placedog.net/500/280/sepia?id=${i}`)
    zipCodes.push(parseInt(faker.address.zipCode()))
    userInterests.push([faker.lorem.sentences(),faker.lorem.sentences()])
  }

  for(let i = 0; i<numUsers;i++){
    users.push({});
    users[i].firstName = firstNames[i]
    users[i].lastName = lastNames[i]
    users[i].userEmail = userEmails[i]
    users[i].hashedPassword = hashedPasswords[i]
    users[i].userImage1 = userImages1[i]
    users[i].userImage2 = userImages2[i]
    users[i].dogImage = dogImages[i]
    users[i].zipCode = zipCodes[i]
    users[i].userInterests = userInterests[i]
  }
  return users;
}

module.exports = createUsers;
