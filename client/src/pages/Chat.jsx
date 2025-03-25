/**
 * Chat Page Component
 *
 * The main chat interface that displays the user's chat list and active chat.
 * It includes potential chat partners, existing chats, and the chat box for messaging.
 *
 * @component
 */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/userChat";
import PotentialChats from "../components/chat/potentialChats";
import ChatBox from "../components/chat/chatBox";
import { fetchUserChats } from "../store/thunks/chatThunks";
import { addMessage, setCurrentChat, setOnlineUsers } from "../store/slices/chatSlice";
import { io } from "socket.io-client";

/**
 * Chat Component
 *
 * Renders the main chat interface with:
 * - List of potential chat partners
 * - User's existing chats
 * - Active chat box
 *
 * @returns {JSX.Element} The rendered Chat component
 */

const Chat = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userChats, isUserChatsLoading, newMessage, currentChat } = useSelector((state) => state.chat);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user) {
      const newSocket = io("http://localhost:3001");
      // dispatch(setSocket(newSocket));
      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);

  // add online users
  useEffect(() => {
    if (socket) {
      socket.emit("addNewUser", user?._id);
      socket.on("getOnlineUsers", (res) => {
        dispatch(setOnlineUsers(res));
      });
      return () => {
        socket.off("getOnlineUsers");
      };
    }
  }, [socket]);

  // add online users
  useEffect(() => {
    if (newMessage) {
      const recipientId = currentChat?.members.find((id) => id !== user?._id);
      socket.emit("sendMessage", { ...newMessage, recipientId });
    }
  }, [newMessage]);

  // add online users
  useEffect(() => {
    if (socket) {
      socket.on("getMessage", (res) => {
        if (currentChat?._id !== res.chatId) {
          return;
        }
        dispatch(addMessage(res));
      });
    }
  }, [socket, currentChat]);

  /**
   * Fetches user's chats when component mounts or user changes
   */
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUserChats(user._id));
    }
  }, [user?._id, dispatch]);

  return (
    <Container>
      {/* Potential chat partners section */}
      <PotentialChats />
      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          {/* User's chat list */}
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatsLoading && <p>Loading chats...</p>}
            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => dispatch(setCurrentChat(chat))}>
                  <UserChat chat={chat} user={user} />
                </div>
              );
            })}
          </Stack>
          {/* Active chat box */}
          <ChatBox />
        </Stack>
      )}
    </Container>
  );
};

export default Chat;
