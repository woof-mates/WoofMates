import axios from 'axios';
import {saltAndHash} from '../../utils/hashPasswordFunc'

//User State

const REGISTER_USER = 'REGISTER_USER';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const UPDATE = 'UPDATE';

const _login = (user) => {
    return {
        type: LOGIN,
        user
    }
};

const registerAUser = (user) => {
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
      console.log('newuser', newUser)
      dispatch(registerAUser(newUser))
    }
    catch (error) {
      console.log(error)
    }
  }
}

export const login = (loginInfo) => async(dispatch) => {
  try {
      const {userEmail, password} = loginInfo
      const hashedPassword = saltAndHash(password)
      const { data } = await (axios.post('/api/auth/login', {userEmail, hashedPassword}))
      dispatch(_login(data))
  } catch(err) {
      alert('User and password do not match');
      console.error(err);
  }
};

const _logout = (emptyUser) => {
  return {
      type: LOGOUT,
      emptyUser
  }
};

export const logout = (userId) => async(dispatch) => {
  try {
      await (axios.delete(`/api/auth/logout/${userId}`))
      dispatch(_logout({}))
  } catch (err) {
      console.error(err);
  }
}

const updateUser = (user) => {
  return {
    type: UPDATE,
    user
  }
}

export const editProfile = (userId, updatedProfile) => async(dispatch) => {
  try {
    updatedProfile.hashedPassword = saltAndHash(updatedProfile.hashedPassword);
    await (axios.put(`/api/users/${userId}`, updatedProfile));
    let updatedUser = await (axios.get(`/api/users/${userId}`))
    dispatch(updateUser(updatedUser.data));
  } catch (err) {
    console.log(err)
  }
}

export default function userReducer (state = {}, action) {
  switch (action.type) {
      case UPDATE:
        return action.user;
      case REGISTER_USER:
          return action.user
      case LOGIN:
        return action.user;
      case LOGOUT:
        return action.emptyUser;
      default:
        return state
  }
}
