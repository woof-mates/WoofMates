const createObjForPref = (list) => {
  let newObjForNewUser1 = {}
  for (let i=0; i<list.length; i++) {
    newObjForNewUser1[list[i]] = 0;
  }
  return newObjForNewUser1
}

const createObjForPref2 = (max) => {
  let newObjForNewUser2 = {}
  for (let i=1; i<=max; i++) {
    newObjForNewUser2[[i]] = 0;
  }
  return newObjForNewUser2
}

module.exports = {createObjForPref, createObjForPref2}

