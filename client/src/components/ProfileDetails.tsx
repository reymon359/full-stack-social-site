import React from 'react';
import { User } from '../graphql/types';
import styled from 'styled-components';

const ProfileDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  padding: 2rem 1rem;
`;

const UserPicture = styled.img`
  border-radius: 100%;
  width: 20%;
  height: 20%;
  min-height: 100px;
  min-width: 100px;
  border: 3px solid ${(props) => props.theme.colors.primaryDark};
`;

const UserName = styled.h1`
  padding: 0.3rem 0;
  font-size: ${(props) => props.theme.fontSizes.xLarge};
  font-weight: ${(props) => props.theme.fontWeights.bold};

  ${(props) => props.theme.media.sm`
    font-size: ${props.theme.fontSizes.mediumLarge};
 `}
`;

const UserUsername = styled.h3`
  padding: 0.3rem 0;
  color: ${(props) => props.theme.colors.dark};
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeights.bold};

  ${(props) => props.theme.media.sm`
    font-size: ${props.theme.fontSizes.medium};
 `}
`;

const UserBio = styled.p`
  padding: 0.3rem 0;
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  width: 60%;
  text-align: center;

  ${(props) => props.theme.media.sm`
    font-size: ${props.theme.fontSizes.normal};
    width: 80%;

 `}
`;

const FollowsContainer = styled.div`
  padding: 0.3rem 0;
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${(props) => props.theme.media.sm`
    font-size: ${props.theme.fontSizes.normal};
 `}

  p {
    margin: 0 0.2rem;
    font-weight: ${(props) => props.theme.fontWeights.bold};
  }
  a {
    margin: 0 0.2rem;
    // color: ${(props) => props.theme.colors.dark}; 
  }
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
      <UserUsername>@{user.username}</UserUsername>
      <UserBio>{user.bio}</UserBio>
      <FollowsContainer>
        <p>{user.followers}</p>
        <a href="#">Followers</a>
        <p>{user.following}</p>
        <a href="#">Following</a>
      </FollowsContainer>
    </ProfileDetailsContainer>
  );
};

export default ProfileDetails;
