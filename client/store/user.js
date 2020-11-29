import axios from "axios";
import {saltAndHash} from '../../utils/hashPasswordFunc'

//User State

const REGISTER_USER = "REGISTER_USER"

export const registerAUser = (user) => {
  return {
      type: REGISTER_USER,
      user
  }
};

export const registerUser = (firstName, lastName, userEmail, password, city, state, zipCode) => {
  return async(dispatch) => {
    try {
      let hashedPassword = saltAndHash(password)
      const newUser = (await axios.post('/api/users/register', {firstName, lastName, userEmail, hashedPassword, city, state, zipCode})).data
      dispatch(registerAUser(newUser))
    }
    catch (error) {
      console.log(error)
    }
  }
}

export const userReducer = (state = {}, action) => {
  switch (action.type) {
      case REGISTER_USER:
          return action.user
      default:
          return state
  }
};
