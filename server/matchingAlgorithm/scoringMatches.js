const score = (dog1, dog2) => {
  //calculate how much dog1 will like dog2
    const dog1FavTraits = favTraits(dog1);
    let score = 0;
    for (let key in dog2){
      if (key === 'pref' || key === 'name'){continue;}
      if (dog1FavTraits[key] === dog2[key]){score++;}
    }
    return score;
  }
