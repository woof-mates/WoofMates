const getUsers = () =>{
  //pulls 100 users from db within range
}

const setQueue = () => {
//creates a queue of 15 best matches from 100 random users in range
}


const favTraits = (dog) => {
  //For now I am just selecting the age, energy, and breed of the most votes
  //This can be changed to return an obj of %liked.
  debugger;
  let age = 0;
  let energyLevel = 0;
  let breed = '';

  let largestSum = 0;
  for (let key in dog.pref.age){
    if (key === 'total'){break;}
    if (dog.pref.age[key] > largestSum){
      largestSum = dog.pref.age[key]
      age = key;
    }
  }
  largestSum = 0;
  for (let key in dog.pref.energyLevel){
    if (key === 'total'){break;}
    if (dog.pref.energyLevel[key] > largestSum){
      largestSum = dog.pref.energyLevel[key]
      energyLevel = key;
    }
  }
  largestSum = 0;
  for (let key in dog.pref.breed){
    if (key === 'total'){break;}
    if (dog.pref.breed[key] > largestSum){
      largestSum = dog.pref.breed[key]
      breed = key;
    }
  }
  return {age: parseInt(age), energyLevel: parseInt(energyLevel), breed}
}


const findMatch = (dog1, ...dogs) => {
  //use score to return dog with highest score
    let highestScore = 0;
    let bestMatch = {};
    let currScore = 0;
    console.log(dog1.pref)
    for (let dog of dogs){
      currScore = score(dog1,dog)
      console.log(dog.name, currScore);
      if (currScore > highestScore){
        highestScore = currScore;
        bestMatch = dog;
      }
    }
    return bestMatch;
  }
