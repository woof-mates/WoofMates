import axios from 'axios';

const LOGIN = 'LOGIN';

const _login = (user) => {
    return {
        type: LOGIN,
        user
    }
};

const login = (userObj) => {
    return async(dispatch) => {
        try {
            const user = await (axios.get('/api/auth/login', userObj))
            dispatch(_login(user))
        } catch(err) { console.error(err); }
    }
}

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case LOGIN: 
            return action.user;
        default: 
            return state
    }
}

export { login };