import React from 'react';
import gql from 'graphql-tag';
import * as fragments from '../../graphql/fragments';
import { useGetUserPostsQuery } from '../../graphql/types';
import PostsList from '../Shared/PostsList';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';
import Toolbar from '@material-ui/core/Toolbar';

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

const StyledTabPanel = styled(TabPanel)``;

interface ProfileTabsParams {
  userId: string;
}

export const ProfileTabs: React.FC<ProfileTabsParams> = ({ userId }) => {
  const { data, loading: loadingUserPosts } = useGetUserPostsQuery({
    variables: { userId },
  });
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
          ) : data && data.userPosts ? (
            <PostsList posts={data.userPosts} />
          ) : (
            <h1>No user posts found</h1>
          )}
        </StyledTabPanel>
        <StyledTabPanel>
          <h2>Liked Posts content</h2>
        </StyledTabPanel>
      </StyledTabs>
    </>
  );
};
