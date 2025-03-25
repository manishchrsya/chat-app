/**
 * Chat Box Component
 *
 * The main chat interface component that displays the active conversation.
 * Shows messages between the current user and the selected recipient.
 *
 * @component
 */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { fetchMessages } from "../../store/thunks/chatThunks";

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
const ChatBox = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { currentChat } = useSelector((state) => state.chat);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);

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

  // Display placeholder when no recipient is selected
  if (!recipientUser)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No conversation selected yet...
      </p>
    );

  return <>chatbox</>;
};

export default ChatBox;
