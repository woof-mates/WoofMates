import axios from 'axios';

const GET_MATCH = 'GET_MATCH';

const _getMatch = (match) => {
    return {
        type: GET_MATCH,
        match
    }
};

const getMatch = (userId) => async(dispatch) => {
    try {
        const { data } = await (axios.get(`/api/match/${userId}`))
        console.log(data)
        dispatch(_getMatch(data))
    } catch(err) { console.error(err); }
};

export default function matchReducer(state = {}, action) {
    switch (action.type) {
        case GET_MATCH:
            return action.match
        default:
            return state
    }
}

export { getMatch }