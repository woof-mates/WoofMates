const Sequelize = require('sequelize');
const db = require('../db');
const { BOOLEAN, JSON} = Sequelize;
const {BREEDS, MAX_DOG_AGE, MAX_DOG_WEIGHT, PROFESSIONS, USER_INTERESTS, MAX_USER_AGE, MAX_DISTANCE_FROM_USER} = require('../../../constants')
const {setValObj, setNumericalObj} = require('../../../utils/dbFuncs');
const { INTEGER } = require('sequelize');

const breedObj = setValObj(BREEDS, 0);
const ageObj = setNumericalObj(MAX_DOG_AGE, 0);
const weightObj = setNumericalObj(MAX_DOG_WEIGHT, 0);
const userAgeObj = setNumericalObj(MAX_USER_AGE, 0);
const userProfessionObj = setValObj(PROFESSIONS, 0);
const userInterestObj = setValObj(USER_INTERESTS, 0);

const Preference = db.define('preference', {
    dogBreed: {
      type: JSON,
      defaultValue: breedObj,
      allowNull: false,
      validate: {
          notEmpty: true
      }
    },
    dogAgeForPref: {
      type: JSON,
      defaultValue: ageObj,
      allowNull: false,
      validate: {
          notEmpty: true
      }
    },
    dogEnergyLevel: {
      type: JSON,
      defaultValue: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0},
      allowNull: false,
      validate: {
          notEmpty: true
      }
    },
    dogWeight: {
      type: JSON,
      defaultValue: weightObj,
      allowNull: false,
      validate: {
          notEmpty: true
      }
    },
    isNeuteredDealbreaker: {
        type: BOOLEAN,
        allowNull: false
    },
    userInterests: {
      type: JSON,
      defaultValue: userInterestObj,
      allowNull: false,
      validate: {
          notEmpty: true
      }
    },
    userAge: {
      type: JSON,
      defaultValue: userAgeObj,
      allowNull: false,
      validate: {
          notEmpty: true
      }
    },
    userProfession: {
      type: JSON,
      defaultValue: userProfessionObj,
      allowNull: false,
      validate: {
          notEmpty: true
      }
    },
    distanceFromLocation: {
      //I set this as an integer which can just be miles from the user
      type: INTEGER,
      defaultValue: 5,
      validate: {
        max: MAX_DISTANCE_FROM_USER,
        min: 1
      }
    }
  })

module.exports = Preference;
