import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';
import AuthScreen from './components/AuthScreen';
import ChatRoomScreen from './components/ChatRoomScreen';
import ChatsListScreen from './components/ChatsListScreen';
// import ChatCreationScreen from './components/ChatCreationScreen';

import { withAuth } from './services/auth.service';
import HomePage from './pages/HomePage';

const App: React.FC = () => (
  <BrowserRouter>
    <Route exact path="/" render={redirectToHome} />
    {/* <Route exact path="/" render={redirectToChats} /> */}
    <Route exact path="/sign-(in|up)" component={AuthScreen} />
    <Route exact path="/home" component={withAuth(HomePage)} />
    <Route exact path="/chats" component={withAuth(ChatsListScreen)} />

    {/* <Route exact path="/:username" component={withAuth(ProfileScreen)} />
    <Route exact path="/post/:postId" component={withAuth(PostScreen)} />
    <Route exact path="/new-post" component={withAuth(PostCreationScreen)} /> */}

    <Route
      exact
      path="/chats/:chatId"
      component={withAuth(
        ({ match, history }: RouteComponentProps<{ chatId: string }>) => (
          <ChatRoomScreen chatId={match.params.chatId} history={history} />
        )
      )}
    />

    {/* <Route exact path="/new-chat" component={withAuth(ChatCreationScreen)} /> */}
  </BrowserRouter>
);
// const redirectToChats = () => <Redirect to="/chats" />;

const redirectToHome = () => <Redirect to="/home" />;
export default App;
