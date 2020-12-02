const Sequelize = require('sequelize');
const db = require('../db');
const {HSTORE, BOOLEAN, ARRAY, JSON} = Sequelize;
const {BREEDS, MAX_DOG_AGE, MAX_DOG_WEIGHT, PROFESSIONS, USER_INTERESTS, MAX_USER_AGE} = require('../../../constants')
const {setValObj, setNumericalObj} = require('../../../utils/dbFuncs')

const breedObj = setValObj(BREEDS, 0);
const ageObj = setNumericalObj(MAX_DOG_AGE, 0);
const weightObj = setNumericalObj(MAX_DOG_WEIGHT, 0);
const userAgeObj = setNumericalObj(MAX_USER_AGE, 0);
const userProfessionObj = setValObj(PROFESSIONS, 0);
const userInterestObj = setValObj(USER_INTERESTS, 0);

const Preference = db.define('preference', {
    dogBreed: {
      type: JSON
      // defaultValue: breedObj,
      // allowNull: false,
      // validate: {
      //     notEmpty: true
      // }
    }
    // dogAge: {
    //   type: HSTORE,
    //   defaultValue: ageObj,
    //   allowNull: false,
    //   validate: {
    //       notEmpty: true
    //   }
    // },
    // dogEnergyLevel: {
    //   type: HSTORE,
    //   defaultValue: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0},
    //   allowNull: false,
    //   validate: {
    //       notEmpty: true
    //   }
    // },
    // dogWeight: {
    //   type: HSTORE,
    //   defaultValue: weightObj,
    //   allowNull: false,
    //   validate: {
    //       notEmpty: true
    //   }
    // },
    // isNeuteredDealbreaker: {
    //     type: BOOLEAN,
    //     defaultValue: false,
    //     allowNull: false
    // },
    // userInterests: {
    //   type: HSTORE,
    //   defaultValue: userInterestObj,
    //   allowNull: false,
    //   validate: {
    //       notEmpty: true
    //   }
    // },
    // userAge: {
    //   type: HSTORE,
    //   defaultValue: userAgeObj,
    //   allowNull: false,
    //   validate: {
    //       notEmpty: true
    //   }
    // },
    // userProfession: {
    //   type: HSTORE,
    //   defaultValue: userProfessionObj,
    //   allowNull: false,
    //   validate: {
    //       notEmpty: true
    //   }
    // }
  })

module.exports = Preference;
