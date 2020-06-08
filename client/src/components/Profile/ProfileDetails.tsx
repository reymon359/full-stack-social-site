import React from 'react';
import { User } from '../../graphql/types';
import styled from 'styled-components';
import { useMe } from '../../services/auth.service';
import { Input } from '../Auth/AuthForms/AuthForms.styles';

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
  padding: 0.4rem 0;
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;

  ${(props) => props.theme.media.sm`
    font-size: ${props.theme.fontSizes.normal};
 `}

  p {
    padding: 0.3rem 0;
    margin: 0 0.2rem;
    font-weight: ${(props) => props.theme.fontWeights.bold};
  }
  a {
    margin: 0 0.2rem;
    color: ${(props) => props.theme.colors.dark};
  }
  a:hover,
  a:focus {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const FollowButton = styled.button`
  color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.light};
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  border: none;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.25s;

  &:hover,
  &:focus {
    box-shadow: 0px 0px 5px 1px ${(props) => props.theme.colors.medium};
  }

  ${(props) => props.theme.media.sm`
    font-size: ${props.theme.fontSizes.normal};
 `}
`;

interface ProfileDetailsProps {
  user: User;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
  const currentUser = useMe();
  const isCurrentUserProfile = currentUser && user.id === currentUser.id;

  return (
    <ProfileDetailsContainer>
      <UserPicture data-testid="user-picture" src={user.picture} />
      <UserName data-testid="user-name">{user.name}</UserName>
      <UserUsername data-testid="user-username">@{user.username}</UserUsername>
      <UserBio data-testid="user-bio">{user.bio}</UserBio>
      <FollowsContainer>
        <p data-testid="user-followers">{user.followers}</p>
        <a href="#">Followers</a>
        <p data-testid="user-following">{user.following}</p>
        <a href="#">Following</a>
        {!isCurrentUserProfile && <FollowButton>Follow</FollowButton>}
      </FollowsContainer>
    </ProfileDetailsContainer>
  );
};

export default ProfileDetails;
