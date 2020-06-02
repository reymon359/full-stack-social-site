import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';
import AuthScreen from './components/AuthScreen';
import ChatRoomScreen from './components/ChatRoomScreen';
// import ChatsListScreen from './components/ChatsListScreen';

import { withAuth } from './services/auth.service';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PostPage from './pages/PostPage';
import NotfoundPage from './pages/NotfoundPage';

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={redirectToHome} />
      <Route exact path="/sign-(in|up)" component={AuthScreen} />
      <Route exact path="/home" component={withAuth(HomePage)} />
      <Route exact path="/:username" component={withAuth(ProfilePage)} />
      <Route exact path="/post/:postId" component={withAuth(PostPage)} />
      {/* <Route exact path="/new-post" component={withAuth(PostCreationScreen)} /> */}

      {/* <Route exact path="/chats" component={withAuth(ChatsListScreen)} /> */}

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
      <Route path="*" component={NotfoundPage} />
    </Switch>
  </BrowserRouter>
);

const redirectToHome = () => <Redirect to="/home" />;
export default App;
