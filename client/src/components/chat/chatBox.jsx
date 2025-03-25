/**
 * Chat Box Component
 *
 * The main chat interface component that displays the active conversation.
 * Shows messages between the current user and the selected recipient.
 *
 * @component
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { fetchMessages, sendTextMessage } from "../../store/thunks/chatThunks";
import moment from "moment";
import { Stack } from "react-bootstrap";
import InputEmoji from "react-input-emoji";
import { setUsersTyping } from "../../store/slices/chatSlice";

/**
 * ChatBox Component
 *
 * Renders the active chat conversation with:
 * - Message history
 * - Recipient user information
 * - Placeholder when no chat is selected
 *
 * @returns {JSX.Element} The rendered ChatBox component
 */
const ChatBox = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { currentChat, messages, isMessagesLoading, usersTyping } = useSelector((state) => state.chat);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");

  const chatboxRef = useRef();

  /**
   * user is typing
   * */

  useEffect(() => {
    if (textMessage && user?._id && recipientUser?._id && currentChat?._id) {
      socket.emit("setTypingStatus", { userId: user?._id, recipientId: recipientUser?._id, isTyping: true });
    }
  }, [textMessage]);


  useEffect(() => {
    if (socket) {
      socket.on("getTypingStatus", (resp) => {
        console.log("resp", resp);
        if (resp.recipientId === user._id) {
          console.log("dispatching the response to store");
          dispatch(setUsersTyping(resp));
        }
      });
    }
  }, [socket, currentChat]);


  useEffect(() => {
    const timer = setTimeout(() => {
      if (user?._id && recipientUser?._id && currentChat?._id) {
        socket.emit("setTypingStatus", { userId: user?._id, recipientId: recipientUser?._id, isTyping: false });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [textMessage]);


  // this is for auto scroll to the bottom
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]); // Runs whenever messages update

  /**
   * Fetches chat messages when:
   * - A new chat is selected
   * - Component mounts with an active chat
   */
  useEffect(() => {
    if (currentChat?._id) {
      dispatch(fetchMessages(currentChat._id));
    }
  }, [currentChat?._id, dispatch]);

  const handleSend = useCallback(() => {
    dispatch(sendTextMessage(textMessage, user, currentChat?._id, setTextMessage));
  }, [currentChat?._id, dispatch, textMessage, user]);

  const isCurrentRecipientTyping = useMemo(() => {
    return usersTyping.find((user) => user.userId === recipientUser._id)?.isTyping;
  }, [recipientUser?._id, usersTyping]);

  // Display placeholder when no recipient is selected
  if (!recipientUser)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No conversation selected yet...
      </p>
    );
  if (isMessagesLoading) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        Messages loading...
      </p>
    );
  }

  return <Stack gap={4} className="chat-box">
    <div className="chat-header" style={{ display: "flex", flexDirection: "column" }}>
      <strong>{recipientUser?.name}</strong>
      <span style={{ fontSize: 10, height: 16 }}>{isCurrentRecipientTyping ? `${recipientUser?.name || "User"} is Typing...` : ""}  </span>
    </div>
    <Stack ref={chatboxRef} gap={3} className="messages">{messages && messages.map((message, index) => <Stack className={`${message?.senderId === user?._id ? "message self align-self-end flex-grow-0" : "message align-self-start flex-grow-0"}`} key={index}>
      <span>{message.text}</span>
      <span className="message-footer">{moment(message.createdAt).calendar()}</span>
    </Stack>)}</Stack>
    <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
      <InputEmoji
        value={textMessage}
        onChange={setTextMessage}
        fontFamily="nunito"
        borderColor="rgba(112,223,0.2)"
        placeholder="Type a message"
        onEnter={handleSend}
        cleanOnEnter
      />
      <button className="send-btn"
        onClick={handleSend}
      // onClick={() => sendTextMessage(textMessage, user, currentChat?._id, setTextMessage)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
          <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
        </svg>
      </button>
    </Stack>
  </Stack>;
};

export default ChatBox;
