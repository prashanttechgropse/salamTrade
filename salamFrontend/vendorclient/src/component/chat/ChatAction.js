import { TYPES } from './ChatActionTypes';

export const sendMessageAction = (message) => {
    return {
        type: TYPES.SEND_MESSAGE,
        message
    }
}


export const addMessageToListAction = (messageObj) => {
    return {
        type: TYPES.ADD_MESSAGE_TO_LIST,
        messageObj
    }
}

export const setMessageList = (payload) => {
    return {
        type: TYPES.SET_MESSSAGE_LIST,
        payload
    }
}

