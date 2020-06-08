import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';
import AuthScreen from './pages/AuthPage';

import { AppRoutes } from './AppRoutes';
import { withAuth } from './services/auth.service';
import HomePage from './pages/HomePage';
import { ProfileContainer } from './components/Profile/ProfileContainer';
import PostPage from './pages/PostPage';
import NotfoundPage from './pages/NotfoundPage';
import NewPostPage from './pages/NewPostPage';
import { AboutContainer } from './About/AboutContainer';

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={AppRoutes.Root} render={redirectToHome} />
      <Route exact path={AppRoutes.Home} component={withAuth(HomePage)} />
      <Route exact path={AppRoutes.Auth} component={AuthScreen} />
      <Route exact path={AppRoutes.Post} component={withAuth(PostPage)} />
      <Route exact path={AppRoutes.NewPost} component={withAuth(NewPostPage)} />
      <Route
        exact
        path={AppRoutes.About}
        component={withAuth(AboutContainer)}
      />
      <Route exact path={AppRoutes.NotFound} component={NotfoundPage} />
      <Route
        exact
        path="/:username"
        component={withAuth(
          ({ match, history }: RouteComponentProps<{ username: string }>) => (
            <ProfileContainer
              username={match.params.username}
              history={history}
            />
          )
        )}
      />
      <Route path={AppRoutes.All} component={NotfoundPage} />
    </Switch>
  </BrowserRouter>
);

const redirectToHome = () => <Redirect to="/home" />;
export default App;
