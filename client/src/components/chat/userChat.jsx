/**
 * User Chat Component
 *
 * A component that displays a single chat preview in the chat list.
 * Shows the recipient's name, avatar, last message preview, and chat metadata.
 *
 * @component
 */

import { useMemo } from "react";
import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/profile.svg";
import { useSelector } from "react-redux";

/**
 * UserChat Component
 *
 * Renders a chat preview card with:
 * - Recipient's avatar
 * - Recipient's name
 * - Last message preview
 * - Timestamp
 * - Unread message count
 * - Online status indicator
 *
 * @param {Object} props - Component props
 * @param {Object} props.chat - Chat object containing chat details
 * @param {Object} props.user - Current user object
 * @returns {JSX.Element} The rendered UserChat component
 */
const UserChat = ({ chat, user }) => {
  // Fetch recipient user details using custom hook
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers } = useSelector((state) => state.chat);

  const isOnline = useMemo(() => {
    return onlineUsers.some((user) => user?.userId === recipientUser?._id);
  }, [onlineUsers, recipientUser?._id]);

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
    >
      {/* Left section: Avatar and user info */}
      <div className="d-flex">
        {/* User avatar */}
        <div className="me-2">
          <img src={avatar} alt="profile pic" height="35px" />
        </div>
        {/* User name and last message */}
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">Text Massage</div>
        </div>
      </div>
      {/* Right section: Chat metadata */}
      <div className="d-flex flex-column align-items-end">
        {/* Last message timestamp */}
        <div className="date">12/12/2022</div>
        {/* Unread message count */}
        <div className="this-user-notifications">2</div>
        {/* Online status indicator */}
        <span className={`${isOnline ? "user-online" : ""}`}></span>
      </div>
    </Stack>
  );
};

export default UserChat;
