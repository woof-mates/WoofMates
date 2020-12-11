const faker = require('faker')
const {RELATIONSHIPS} = require('../../../constants')
const {getRandomInt} = require('../../../utils/mathFuncs')

const deepIncludes = (arr, pair) => {
  for (let elem of arr){
    if (((elem[0] === pair[0] && elem[1] === pair[1]) || (elem[0] === pair[1] && elem[1] === pair[0]))){
      return true;
    }
  }
  return false
}

const createRelationships = (numRelps, numUsers) => {
  let userId = [];
  let matchId = [];
  let result = [];
  let relationships = [];
  let pairs = [];

  for (let i = 0; i < numRelps;i++){
    let user = getRandomInt(numUsers - 1) + 1
    userId.push(user)
    let match = getRandomInt(numUsers - 1) + 1
    while (match === user || deepIncludes(pairs, [user, match]) || pairs.includes([match, user])){
      match = getRandomInt(numUsers - 1) + 1
    }
    matchId.push(match)
    pairs.push([user, match])
    result.push(RELATIONSHIPS[getRandomInt(RELATIONSHIPS.length)])
  }

  for (let i = 0; i < numRelps;i++){
    relationships.push({});
    relationships[i].userId = userId[i]
    relationships[i].matchId = matchId[i]
    relationships[i].result = result[i]
  }
  return relationships;
}

module.exports = createRelationships;
