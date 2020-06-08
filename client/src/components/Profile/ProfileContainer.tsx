import React, { useCallback } from 'react';
import { History } from 'history';
import { Navbar } from '../Navbar';
import gql from 'graphql-tag';
import * as fragments from '../../graphql/fragments';
import { useGetUserQuery } from '../../graphql/types';
import ProfileDetails from './ProfileDetails';
import { NotFoundContent } from '../NotFound';

// eslint-disable-next-line
const getUserQuery = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      ...User
    }
  }
  ${fragments.user}
`;

interface ProfileContainerParams {
  history: History;
  username: string;
}
export const ProfileContainer: React.FC<ProfileContainerParams> = ({
  history,
  username,
}) => {
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
        <NotFoundContent />
      )}
    </>
  );
};
