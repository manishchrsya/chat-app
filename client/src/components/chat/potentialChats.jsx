/**
 * Potential Chats Component
 *
 * A component that displays a list of users with whom the current user can start a new chat.
 * It fetches potential chat partners and allows creating new chats by clicking on a user.
 *
 * @component
 */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPotentialChats,
  createNewChat,
} from "../../store/thunks/chatThunks";

/**
 * PotentialChats Component
 *
 * Renders a list of potential chat partners with:
 * - User names
 * - Online status indicators
 * - Click handlers to create new chats
 *
 * @returns {JSX.Element} The rendered PotentialChats component
 */
const PotentialChats = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { potentialChats, userChats } = useSelector((state) => state.chat);

  /**
   * Fetches potential chat partners when:
   * - Component mounts
   * - User changes
   * - User's existing chats change
   */
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchPotentialChats(userChats, user._id));
    }
  }, [user?._id, userChats, dispatch]);

  return (
    <div className="all-users">
      {/* Map through potential chat partners */}
      {potentialChats &&
        potentialChats.map((currentUser, index) => {
          return (
            <div
              className="single-user"
              role="button"
              tabIndex={0}
              key={index}
              onClick={() =>
                dispatch(createNewChat(user?._id, currentUser?._id))
              }
            >
              {/* Display user name */}
              {user.name}
              {/* Online status indicator */}
              <span className="user-online" />
            </div>
          );
        })}
    </div>
  );
};

export default PotentialChats;
