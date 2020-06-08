import React from 'react';
import { User } from '../graphql/types';
import styled from 'styled-components';

const ProfileDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  padding: 2rem;
`;

const UserPicture = styled.img`
  border-radius: 100%;
  width: 20%;
  height: 20%;
  min-height: 100px;
  min-width: 100px;
  border: 2px solid ${(props) => props.theme.colors.primary};
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
