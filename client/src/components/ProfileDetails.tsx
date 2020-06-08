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

const UserName = styled.h1`
  padding: 0.5rem 0;
  font-size: ${(props) => props.theme.fontSizes.xLarge};
  font-weight: ${(props) => props.theme.fontWeights.bold};

  ${(props) => props.theme.media.sm`
    font-size: ${props.theme.fontSizes.mediumLarge};
 `}
`;

const UserUsername = styled.h3`
  padding: 0.2rem 0;
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeights.regular};

  ${(props) => props.theme.media.sm`
    font-size: ${props.theme.fontSizes.normal};
 `}
`;

const UserBio = styled.p`
  padding: 0.2rem 0;
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeights.regular};

  ${(props) => props.theme.media.sm`
    font-size: ${props.theme.fontSizes.normal};
 `}
`;

interface ProfileDetailsProps {
  user: User;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }): any => {
  console.log(user);
  return (
    <ProfileDetailsContainer>
      <UserPicture src={user.picture} />
      <UserName> {user.name}</UserName>
      <UserUsername>{user.username}</UserUsername>
      <UserBio>{user.bio}</UserBio>
    </ProfileDetailsContainer>
  );
};

export default ProfileDetails;
