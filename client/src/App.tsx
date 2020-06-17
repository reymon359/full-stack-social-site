import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';

import { AppRoutes } from './AppRoutes';
import { withAuth } from './services/auth.service';
import { ProfileContainer } from './components/Profile';
import { AboutContainer } from './components/About/AboutContainer';
import { AuthContainer } from './components/Auth';
import { HomeContainer } from './components/Home';
import { PostContainer } from './components/Post';
import { NewPostContainer } from './components/NewPost';
import { NotFoundContainer } from './components/NotFound';

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={AppRoutes.Root} render={redirectToHome} />
      <Route exact path={AppRoutes.Home} component={withAuth(HomeContainer)} />
      <Route exact path={AppRoutes.Auth} component={AuthContainer} />

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
      {/*<Route exact path={AppRoutes.NotFound} component={NotFoundContainer} />*/}
      <Route
        exact
        path="/post/:postId"
        component={withAuth(
          ({ match, history }: RouteComponentProps<{ postId: string }>) => (
            <PostContainer postId={match.params.postId} history={history} />
          )
        )}
      />
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
      <Route path={AppRoutes.All} component={NotFoundContainer} />
    </Switch>
  </BrowserRouter>
);

const redirectToHome = () => <Redirect to="/home" />;
export default App;
