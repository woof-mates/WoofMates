const faker = require('faker')

const createPrompts = (numDogs) => {
  let dogSpeak = ['Woof', "I'm hungry!", 'I know we just went but I want to go outside again...', 'When will you be home?', 'Play with me!'];
  let favoriteActivityWithDog = ['Play fetch', 'Go to the park', 'Snuggle', 'Watch TV', 'Get a beer'];
  let prompts = [];

//   for (let i = 0; i < numDogs;i++){
//     dogSpeak.push(faker.lorem.sentences())
//     favoriteActivityWithDog.push(faker.lorem.sentences())
//   }

  for (let i = 0; i < numDogs;i++){
    prompts.push({});
    prompts[i].dogSpeak = dogSpeak[i]
    prompts[i].favoriteActivityWithDog = favoriteActivityWithDog[i]
    prompts[i].userId = i + 1

  }
  return prompts;
}

module.exports = createPrompts;
