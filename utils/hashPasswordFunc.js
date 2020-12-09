const bcrypt = require('bcrypt');

const createSalt = () => new Promise((res, rej) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) rej(err);
    else res(salt);
  });
});

const createHash = (word, salt) => new Promise((res, rej) => {
  bcrypt.hash(word, salt, (err, hash) => {
    if (err) rej(err);
    else res(hash);
  });
});

const saltAndHash = async (word) => {
  try {
    const salt = await createSalt();
    const hashedWord = await createHash(word, salt);
    return hashedWord;
  } catch (err) {
    console.error('Failed to salt and hash password!');
    throw err;
  }
};

// function hashPasswordFunc(str) {
//   let hashedStr = ''
//   for (let i=0; i<str.length; i++) {
//     hashedStr += str[i].charCodeAt(0) * 420
//   }
//   return hashedStr
// }

// function salt(str) {
//   return str + process.env.SALT;
// }

// function saltAndHash(str) {
//   return hashPasswordFunc(salt(str))
// }


module.exports = {
  saltAndHash
}
