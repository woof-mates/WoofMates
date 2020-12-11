import axios from 'axios';

const GET_MATCHES = 'GET_MATCHES';

const _getMatches = (matches) => {
    return {
        type: GET_MATCHES,
        matches
    }
};

const getMatches = (userId) => async(dispatch) => {
    try {
        //list of all matches returns the 'matchId'. 'matchId' refers to the id that is not the userId from the api route
        const { data } = await (axios.get(`/api/matches/${userId}`));

        //map through above 'matchId' to get the individual user info
        const getAllMatches = await Promise.all(data.map(matchedId => axios.get(`api/users/${matchedId}`)));
        
        //map through to get user data for each
        const allMatches = getAllMatches.map(match => {
            return match.data
        });

        dispatch(_getMatches(allMatches));

    } catch(err) { console.error(err); };
};

export default function matchesReducer(state = [], action) {
    switch (action.type) {
        case GET_MATCHES:
            return action.matches
        default:
            return state
    }
};

export { getMatches };