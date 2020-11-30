import axios from 'axios';

const LOGIN = 'LOGIN';

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

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case LOGIN: 
            return action.user;
        default: 
            return state
    }
}

export { login };