import axios from 'axios';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT'

const _login = (user) => {
    return {
        type: LOGIN,
        user
    }
};

const login = (loginInfo) => async(dispatch) => {
    try {
        const { data } = await (axios.post('/api/auth/login', loginInfo))
        dispatch(_login(data))
    } catch(err) { 
        alert(err.message);
        console.error(err); 
    }
};

const _logout = (emptyUser) => {
    return {
        type: LOGOUT,
        emptyUser
    }
};

const logout = (userId) => async(dispatch) => {
    try {
        const { data } = await (axios.delete(`/api/auth/logout/${userId}`))
        dispatch(_logout({}))
    } catch(err) {
        console.error(err);
    }
}

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case LOGIN: 
            return action.user;
        case LOGOUT:
            return action.emptyUser;
        default: 
            return state
    }
}

export { login, logout };