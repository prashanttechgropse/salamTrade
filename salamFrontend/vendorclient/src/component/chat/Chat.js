import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { sendMessageAction, setMessageList } from "./ChatAction";
import "./chat.css";
const URL = process.env.REACT_APP_SERVER_URL;

function Chat(props) {
  const messageList = useSelector((state) => state.chatUi.messageList);
  const senderId = useSelector((state) => state.inititateState.userId);
  const receiverId = useSelector((state) => state.chatUi.receiverId);
  const senderName = useSelector((state) => state.inititateState.name);

  const dispatch = useDispatch();
  const [showChatBoxClass, setShowChatBoxClass] = useState(
    props.isChatBoxVisible ? "show-chatBox" : "hide-chatBox"
  );
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setShowChatBoxClass(
      props.isChatBoxVisible ? "show-chatBox" : "hide-chatBox"
    );
    if (props.isChatBoxVisible) fetchChats();
  }, [props.isChatBoxVisible]);

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

  return (
    <div
      className={`modal fade chat-design-trade ${showChatBoxClass}`}
      id="myModal"
      onClick={props.showChatBox}
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
              className="minimise"
              onClick={props.showChatBox}
            >
              ×
            </button>
            <h4 className="modal-title" id="myModalLabel">
              <i className="fa fa-comments" /> Admin
            </h4>
          </div>
          <div className="modal-body">
            <div className="messegebox">
              <div className="received-messege">
                <p> Hello {senderName}</p>
              </div>
              {messageList !== undefined &&
                messageList
                  // .filter(item => item.senderId === senderId && item.receiverId === receiverId)
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
                        <span>{item.createtime}</span>
                        <p>{item.message}</p>
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
