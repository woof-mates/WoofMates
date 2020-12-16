const faker = require('faker')

const createPrompts = (numDogs) => {
  let dogSpeak = [];
  let favoriteActivityWithDog = [];
  let prompts = [];

  for (let i = 0; i < numDogs;i++){
    dogSpeak.push(faker.lorem.sentences())
    favoriteActivityWithDog.push(faker.lorem.sentences())
  }

  for (let i = 0; i < numDogs;i++){
    prompts.push({});
    prompts[i].dogSpeak = dogSpeak[i]
    prompts[i].favoriteActivityWithDog = favoriteActivityWithDog[i]
    prompts[i].userId = i + 1

  }
  return prompts;
}

module.exports = createPrompts;
