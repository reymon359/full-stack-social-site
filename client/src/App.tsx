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
import ChatCreationScreen from './components/ChatCreationScreen';

import { withAuth } from './services/auth.service';

const redirectToHome = () => <Redirect to="/home" />;

const App: React.FC = () => (
  <BrowserRouter>
    <Route exact path="/" render={redirectToHome} />
    <Route exact path="/sign-(in|up)" component={AuthScreen} />
    <Route exact path="/home" component={withAuth(HomeScreen)} />
    <Route exact path="/:username" component={withAuth(ProfileScreen)} />
    <Route exact path="/:postId" component={withAuth(PostScreen)} />
    <Route exact path="/editProfile" component={withAuth(ChatsListScreen)} />

    <Route
      exact
      path="/chats/:chatId"
      component={withAuth(
        ({ match, history }: RouteComponentProps<{ chatId: string }>) => (
          <ChatRoomScreen chatId={match.params.chatId} history={history} />
        )
      )}
    />

    <Route exact path="/new-chat" component={withAuth(ChatCreationScreen)} />
  </BrowserRouter>
);

export default App;
