import React from 'react';
import { History } from 'history';

interface ProfilePageProps {
  history: History;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ history }) => (
  <h1>Profile</h1>
);

export default ProfilePage;
