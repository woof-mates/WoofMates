import axios from 'axios';

const GET_CHAT = 'GET_CHAT';

const setChat = (chat) => {
    return {
        type: GET_CHAT,
        chat
    }
}

export const getChat = (fromId, toId) => async(dispatch) => {
    try {
        const { data } = await axios.get(`api/firebaseChat/${fromId}/${toId}`);
        dispatch(setChat(data))
    } catch (err) {
        console.log(err)
    }
}

const SEND_CHAT = 'SEND_CHAT';

const send_Chat = (message) => {
    return {
        type: SEND_CHAT,
        message
    }
}

export const sendChat = (fromId, toId, message, timestamp, from, to) => async(dispatch) => {
    try {
        await axios.put(`/api/firebasechat/${fromId}/${toId}`, { message, timestamp, from, to});
        dispatch(send_Chat({from, message, timestamp, to}))
    } catch (error) {
        console.log(error)
    }
}

export default function chatReducer (state = [], action) {
    switch (action.type) {
        case GET_CHAT:
            return action.chat
        case SEND_CHAT:
            return [...state, action.message]
        default: 
            return state
    }
}

