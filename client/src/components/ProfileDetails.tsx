import React from 'react';
import { User } from '../graphql/types';
import styled from 'styled-components';

const ProfileDetailsContainer = styled.div`
  background-color: red;
`;

interface ProfileDetailsProps {
  user: User;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }): any => {
  return <ProfileDetailsContainer>{user.username}</ProfileDetailsContainer>;
};

export default ProfileDetails;
