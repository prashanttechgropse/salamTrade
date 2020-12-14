import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { addMessageToListAction, showChatBoxAction } from './ChatAction'
import $ from 'jquery';
import Chat from './Chat';
const URL = process.env.REACT_APP_SERVER_URL;
const socket = io(URL);
socket.removeAllListeners()

function SocketController(props) {
    const isChatBoxVisible = useSelector(state => state.chatUi.isChatBoxVisible);
    const receiverId = useSelector(state => state.chatUi.receiverId);
    const senderId = useSelector(state => state.inititateState.userId);
    const message = useSelector(state => state.chatUi.message)
    const dispatch = useDispatch();


    socket.once('RECEIVE_MESSAGE', function (data) {
        dispatch(addMessageToListAction(data))
    });

    useEffect(() => {
        if (message.length > 0) {
            socket.emit('SEND_MESSAGE', {
                author: 'Ravi',
                senderId,
                receiverId,
                message
            });
        }
        return () => {

        }
    }, [message])

    const showChatBox = (event) => {
        const chatModalEl = $('.modal-dialog')[0];
        const hoveredEl = event.target;
        if (!$.contains(chatModalEl, hoveredEl)) {
            dispatch(showChatBoxAction());
        }

    }


    return <Chat isChatBoxVisible={isChatBoxVisible} showChatBox={showChatBox} />
}


export default SocketController;