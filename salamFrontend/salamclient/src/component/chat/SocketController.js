import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { addMessageToListAction } from './ChatAction';

const URL = process.env.REACT_APP_SERVER_URL;
const socket = io(URL);
socket.removeAllListeners()

function SocketController(props) {
    const message = useSelector(state => state.chatUi.message);
    const senderId = useSelector(state => state.inititateState.userId);
    const receiverId = useSelector(state => state.chatUi.receiverId);
    const dispatch = useDispatch();

    socket.once('RECEIVE_MESSAGE', function (data) {
        dispatch(addMessageToListAction(data))
    });

    useEffect(() => {
        if (message.length > 0) {
            socket.emit('SEND_MESSAGE', {
                senderId,
                receiverId,
                message
            });
        }
        return () => {

        }
    }, [message]);

    return <></>
}


export default SocketController;