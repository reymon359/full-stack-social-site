import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';
import AuthScreen from './pages/AuthContainer';

import { AppRoutes } from './AppRoutes';
import { withAuth } from './services/auth.service';
import HomeContainer from './pages/Home/HomeContainer';
import { ProfileContainer } from './components/Profile';
import PostContainer from './pages/PostContainer';
import NotfoundContainer from './pages/NotfoundContainer';
import NewPostContainer from './pages/NewPostContainer';
import { AboutContainer } from './components/About/AboutContainer';

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={AppRoutes.Root} render={redirectToHome} />
      <Route exact path={AppRoutes.Home} component={withAuth(HomeContainer)} />
      <Route exact path={AppRoutes.Auth} component={AuthScreen} />
      <Route exact path={AppRoutes.Post} component={withAuth(PostContainer)} />
      <Route
        exact
        path={AppRoutes.NewPost}
        component={withAuth(NewPostContainer)}
      />
      <Route
        exact
        path={AppRoutes.About}
        component={withAuth(AboutContainer)}
      />
      <Route exact path={AppRoutes.NotFound} component={NotfoundContainer} />
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
      <Route path={AppRoutes.All} component={NotfoundContainer} />
    </Switch>
  </BrowserRouter>
);

const redirectToHome = () => <Redirect to="/home" />;
export default App;
