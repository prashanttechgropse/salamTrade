import { TYPES } from './ChatActionTypes';

const defaultState = {
    messageList: [],
    message: '',
    receiverId: null,
    isChatBoxVisible: false
};

const chatReducer = (state = defaultState, action) => {
    switch (action.type) {
        case TYPES.SEND_MESSAGE:
            return {
                ...state,
                message: action.message,
            }
        case TYPES.ADD_MESSAGE_TO_LIST:
            var index = state.messageList.findIndex(x => x.message == action.messageObj.message)
            return {
                ...state,
                message: '',
                messageList: index === -1 ? [...state.messageList, action.messageObj] : state.messageList
            }
        case TYPES.SET_MESSSAGE_LIST:

            return {
                ...state,
                messageList: action.payload.messageList,
                receiverId: action.payload.receiverId,
            }
        case TYPES.SHOW_CHAT_BOX:
            return {
                ...state,
                receiverId: action.payload.receiverId,
                isChatBoxVisible: !state.isChatBoxVisible,
                name : action.payload.name
            }
        default:
            return {
                ...state,
                isChatBoxVisible: false,
                messageList: state.messageList !== undefined ? state.messageList : []
            };
    }
}

export default chatReducer