import React, { Suspense } from 'react';
import { History } from 'history';
import Navbar from '../../components/Navbar';
import gql from 'graphql-tag';
import * as fragments from '../../graphql/fragments';
import { useGetUserQuery } from '../../graphql/types';
import { Redirect } from 'react-router-dom';
import ProfileDetails from '../../components/ProfileDetails';

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
      <Suspense fallback={<h1>Loading profile...</h1>}>
        <ProfileDetails user={user} />
      </Suspense>
    </>
  );
};

export default ProfilePage;
