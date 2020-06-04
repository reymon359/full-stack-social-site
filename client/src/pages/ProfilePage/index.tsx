import React from 'react';
import { History } from 'history';
import Navbar from '../../components/Navbar';

interface ProfilePageProps {
  history: History;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ history }) => {
  return (
    <>
      <Navbar history={history} />
      <h1>Profile</h1>
    </>
  );
};

export default ProfilePage;
