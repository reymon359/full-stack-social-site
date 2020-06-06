import React from 'react';
import { User } from '../graphql/types';
import styled from 'styled-components';

const ProfileDetailsContainer = styled.div`
  background-color: red;
`;

const UserPicture = styled.img`
  border-radius: 100%;
`;

interface ProfileDetailsProps {
  user: User;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }): any => {
  return (
    <ProfileDetailsContainer>
      <UserPicture src={user.picture} />
      {user.username}
    </ProfileDetailsContainer>
  );
};

export default ProfileDetails;
