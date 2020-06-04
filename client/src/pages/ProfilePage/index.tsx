import React from 'react';
import { History } from 'history';
import Navbar from '../../components/Navbar';
// import { useGetUserQuery, User } from '../../graphql/types';

interface ProfilePageProps {
  history: History;
}
interface ProfilePageProps {
  history: History;
  username: string;
}
const ProfilePage: React.FC<ProfilePageProps> = ({ history, username }) => {
  // const { data, loading, fetchMore } = useGetUserQuery({
  //   variables: { username, after, limit },
  // });

  return (
    <>
      <Navbar history={history} />
      <h1>Profile</h1>
    </>
  );
};

export default ProfilePage;
