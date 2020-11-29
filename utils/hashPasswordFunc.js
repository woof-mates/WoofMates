
function hashPasswordFunc(str) {
  let hashedStr = ''
  for (let i=0; i<str.length; i++) {
    hashedStr += str[i].charCodeAt(0) * 420
  }
  return hashedStr
}

function salt(str) {
  return str + process.env.SALT;
}

function saltAndHash(str) {
  return hashPasswordFunc(salt(str))
}

module.exports = {
  saltAndHash
}
