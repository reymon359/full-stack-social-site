import React from 'react';
import { History } from 'history';
import Navbar from '../../components/Navbar';
import gql from 'graphql-tag';
import * as fragments from '../../graphql/fragments';
import { useGetUserQuery } from '../../graphql/types';
import { Redirect } from 'react-router-dom';
import ChatNavbar from '../../components/ChatRoomScreen/ChatNavbar';
import MessagesList from '../../components/ChatRoomScreen/MessagesList';
import MessageInput from '../../components/ChatRoomScreen/MessageInput';

// eslint-disable-next-line
const getUserQuery = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      ...User
    }
  }
  ${fragments.user}
`;

interface ProfilePageParams {
  history: History;
  username: string;
}
const ProfilePage: React.FC<ProfilePageParams> = ({ history, username }) => {
  const { data, loading, fetchMore } = useGetUserQuery({
    variables: { username },
  });

  if (data === undefined) {
    return null;
  }
  const user = data.user;
  const loadingUser = loading;

  if (loadingUser) return null;
  if (user === null) return null;

  console.log(user);

  // User was probably removed from cache by the subscription handler
  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Navbar history={history} />
      {user?.id && <h1>Profile from {user.username}</h1>}
    </>
  );
};

export default ProfilePage;
//
// interface ChatRoomScreenParams {
//   chatId: string;
//   history: History;
// }
//
// export interface ChatQueryMessage {
//   id: string;
//   content: string;
//   createdAt: Date;
// }
//
// export interface ChatQueryResult {
//   id: string;
//   name: string;
//   picture: string;
//   messages: Array<ChatQueryMessage>;
// }
//
// type OptionalChatQueryResult = ChatQueryResult | null;
//
// const ChatRoomScreen: React.FC<ChatRoomScreenParams> = ({
//   history,
//   chatId,
// }) => {
//   const [chat, setChat] = useState<OptionalChatQueryResult>(null);
//
//   useMemo(async () => {
//     const body = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphql`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         query: getChatQuery,
//         variables: { chatId },
//       }),
//     });
//     const {
//       data: { chat },
//     } = await body.json();
//     setChat(chat);
//   }, [chatId]);
//
//   if (!chat) return null;
//
//   return (
//     <Container>
//       <ChatNavbar chat={chat} history={history} />
//       {chat.messages && <MessagesList messages={chat.messages} />}
//       <MessageInput />
//     </Container>
//   );
// };
