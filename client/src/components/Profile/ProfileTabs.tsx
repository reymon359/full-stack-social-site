import React from 'react';
import gql from 'graphql-tag';
import * as fragments from '../../graphql/fragments';
import {
  useGetUserPostsQuery,
  useGetUserLikedPostsQuery,
} from '../../graphql/types';
import PostsList from '../Shared/PostsList';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';

// eslint-disable-next-line
const getUserPostsQuery = gql`
  query GetUserPosts($userId: ID!) {
    userPosts(userId: $userId) {
      id
      title
      picture
      description
      content
      createdAt
      likes
      user {
        ...User
      }
    }
  }
  ${fragments.user}
`;

// eslint-disable-next-line
const getUserLikedPostsQuery = gql`
  query GetUserLikedPosts($userId: ID!) {
    userLikedPosts(userId: $userId) {
      id
      title
      picture
      description
      content
      createdAt
      likes
      user {
        ...User
      }
    }
  }
  ${fragments.user}
`;

const StyledTabs = styled(Tabs)`
  width: 100%;
`;

const StyledTabList = styled(TabList)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const StyledTab = styled(Tab)`
  margin: 0;
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  cursor: pointer;
  padding-bottom: 12px;

  &:focus,
  &:hover {
    outline: none;
    padding-bottom: 10px;
    border-bottom: 2px solid ${(props) => props.theme.colors.primary};
  }
`;

const StyledTabPanel = styled(TabPanel)`
  margin: auto;
`;

interface ProfileTabsParams {
  userId: string;
}

export const ProfileTabs: React.FC<ProfileTabsParams> = ({ userId }) => {
  const {
    data: userPostsData,
    loading: loadingUserPosts,
  } = useGetUserPostsQuery({
    variables: { userId },
  });
  console.log(userPostsData);
  const {
    data: userLikedPostsData,
    loading: loadingUserLikedPosts,
  } = useGetUserLikedPostsQuery({
    variables: { userId },
  });
  console.log(userLikedPostsData);

  return (
    <>
      <StyledTabs>
        <StyledTabList>
          <StyledTab>Posts</StyledTab>
          <StyledTab>Liked Posts</StyledTab>
        </StyledTabList>

        <StyledTabPanel>
          {loadingUserPosts ? (
            <h1>Loading posts...</h1>
          ) : userPostsData && userPostsData.userPosts.length > 0 ? (
            <PostsList posts={userPostsData.userPosts} />
          ) : (
            <div
              style={{
                textAlign: 'center',
              }}>
              No user posts found
            </div>
          )}
        </StyledTabPanel>
        <StyledTabPanel>
          {loadingUserLikedPosts ? (
            <h1>Loading Liked posts...</h1>
          ) : userLikedPostsData &&
            userLikedPostsData.userLikedPosts.length > 0 ? (
            <PostsList posts={userLikedPostsData.userLikedPosts} />
          ) : (
            <div
              style={{
                textAlign: 'center',
              }}>
              No user Liked posts found
            </div>
          )}
        </StyledTabPanel>
      </StyledTabs>
    </>
  );
};
