import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  sendMessageAction,
  setMessageList,
  showChatBoxAction,
} from "./ChatAction";
import "./chat.css";
const URL = process.env.REACT_APP_SERVER_URL;

function Chat(props) {
  const messageList = useSelector((state) => state.chatUi.messageList);
  const senderId = useSelector((state) => state.inititateState.userId);
  const receiverId = useSelector((state) => state.chatUi.receiverId);
  const senderName = useSelector((state) => state.chatUi.name);
  const isChatBoxVisible = useSelector(
    (state) => state.chatUi.isChatBoxVisible
  );
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isChatBoxVisible) fetchChats();
  }, [isChatBoxVisible]);

  const fetchChats = async () => {
    try {
      const chatResponse = await axios.post(URL + "/api/user/fetch-chat", {
        senderId,
        receiverId,
      });
      if (chatResponse && chatResponse.data) {
        setMessage("");
        dispatch(setMessageList(chatResponse.data));
      }
    } catch (error) {
      console.log("---------Error", error);
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.keyCode === 13) {
      dispatch(sendMessageAction(message));
      setMessage("");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messageList]);

  const showChatBox = (event) => {
    const chatModalEl = $(".modal-dialog")[0];
    const hoveredEl = event.target;
    if (!$.contains(chatModalEl, hoveredEl)) {
      dispatch(showChatBoxAction({ receiverId }));
    }
  };

  return (
    <div
      className={`modal fade chat-design-trade ${
        isChatBoxVisible ? "show-chatBox" : "hide-chatBox"
      }`}
      id="myModal"
      onClick={showChatBox}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="myModalLabel"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div
        className="modal-dialog"
        role="document"
        style={{ transform: "translate(0, 0%)" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <h4 className="modal-title" id="myModalLabel">
              <i className="fa fa-comments" /> {senderName}
            </h4>
          </div>
          <div className="modal-body">
            <div className="messegebox">
              <div className="received-messege">
                <p> Hello {senderName}</p>
              </div>
              {messageList !== undefined &&
                messageList
                  // .filter(item => (item.senderId === senderId && item.receiverId === receiverId) ||
                  //     item.senderId === receiverId && item.receiverId === senderId)
                  .map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          item.senderId === senderId
                            ? "received-messege"
                            : "send-messege"
                        }
                      >
                        <p>{item.message}</p>
                        <span>{item.createtime}</span>
                      </div>
                    );
                  })}
              <div
                style={{ float: "left", clear: "both" }}
                ref={messagesEndRef}
              />
            </div>
          </div>
          <div className="modal-footer">
            <div className="form-inline" style={{ width: "100%" }}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={message}
                  onKeyDown={(e) => handleInputKeyDown(e)}
                  placeholder="Enter your message..."
                  onChange={(ev) => setMessage(ev.target.value)}
                />
              </div>
              <button
                className="btn btn-default"
                onClick={() => {
                  dispatch(sendMessageAction(message));
                  setMessage("");
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
