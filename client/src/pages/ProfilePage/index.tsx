import React, { useCallback } from 'react';
import { History } from 'history';
import Navbar from '../../components/Navbar';
import gql from 'graphql-tag';
import * as fragments from '../../graphql/fragments';
import { useGetUserQuery } from '../../graphql/types';
import ProfileDetails from '../../components/ProfileDetails';
import NotfoundPage from '../NotfoundPage';
import NotFoundContainer from '../../components/NotFoundContainer';

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
  const { loading, data } = useGetUserQuery({
    variables: { username },
  });

  return (
    <>
      <Navbar history={history} />
      {loading ? (
        <h1>Loading profile...</h1>
      ) : data && data.user ? (
        <ProfileDetails user={data.user} />
      ) : (
        <NotFoundContainer />
      )}
    </>
  );
};

export default ProfilePage;
