const {getRandomInt} = require('./mathFuncs')

const setValObj = (valArr, maxNumOfVotes) => {
  const valObj = {}
  for (let elem of valArr){
    valObj[elem] = getRandomInt(maxNumOfVotes);
  }
  return valObj;
}

const setNumericalObj = (maxVal, maxNumOfVotes) => {
  const numObject = {}
  for (let i = 1; i <= maxVal; i++){
    numObject[i] = getRandomInt(maxNumOfVotes);
  }
  return numObject;
}

module.exports = {setValObj, setNumericalObj}
