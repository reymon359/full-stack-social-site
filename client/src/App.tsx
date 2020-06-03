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
import { AppRoutes } from './AppRoutes';
const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path={AppRoutes.All} component={NotfoundPage} />
      <Route exact path={AppRoutes.Root} render={redirectToHome} />
      <Route exact path={AppRoutes.Home} component={withAuth(HomePage)} />
      <Route exact path={AppRoutes.Auth} component={AuthScreen} />
      <Route exact path={AppRoutes.Profile} component={withAuth(ProfilePage)} />
      <Route exact path={AppRoutes.Post} component={withAuth(PostPage)} />
      {/* <Route exact path={AppRoutes.NewPost} component={withAuth(NewPostPage)} /> */}
      {/* <Route exact path={AppRoutes.About} component={withAuth(AboutPage)} /> */}

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
    </Switch>
  </BrowserRouter>
);

const redirectToHome = () => <Redirect to="/home" />;
export default App;
