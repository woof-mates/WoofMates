import axios from 'axios';
import { matchEmail } from '../../utils/emailFunc'

const GET_MATCH = 'GET_MATCH';

const _getMatch = (match) => {
    return {
        type: GET_MATCH,
        match
    }
};

const getMatch = (userId, userLatitude, userLongitude) => async(dispatch) => {
    try {
        const { data } = await (axios.get(`/api/match/${userId}`, { params: { userLatitude, userLongitude } }))
        // console.log(`here`)
        // console.log(data)
        dispatch(_getMatch(data))
    } catch (err) { console.error(err); }
};

const sendDecision = (userId, matchId, decision) => async() => {
    try {
        const relationship = (await (axios.put(`/api/match/${userId}`, { decision, matchId }))).data;
        return relationship;
    } catch (err) { console.error(err); }
}

const sendEmailToMatch = (user, match) => async() => {
    try {
        const matchEmailText = matchEmail(user, match)
        await (axios.post(`/api/match/email`, { matchEmail: match.userEmail, matchEmailText }))
    } catch (err) { console.error(err); }
}

export default function matchReducer(state = {}, action) {
    switch (action.type) {
        case GET_MATCH:
            return action.match
        default:
            return state
    }
}

export { getMatch, sendDecision, sendEmailToMatch }
