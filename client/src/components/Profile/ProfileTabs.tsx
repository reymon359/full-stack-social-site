import React from 'react';
import { History } from 'history';
import { Navbar } from '../Navbar';
import gql from 'graphql-tag';
import * as fragments from '../../graphql/fragments';
import { useGetUserPostsQuery, User } from '../../graphql/types';
import ProfileDetails from './ProfileDetails';
import { NotFoundContent } from '../NotFound';
import PostsList from '../Shared/PostsList';

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

interface ProfileTabsParams {
  userId: string;
}

export const ProfileTabs: React.FC<ProfileTabsParams> = ({ userId }) => {
  const { data, loading: loadingUserPosts } = useGetUserPostsQuery({
    variables: { userId },
  });
  return (
    <>
      <h2>User Posts</h2>
      {loadingUserPosts ? (
        <h1>Loading posts...</h1>
      ) : data && data.userPosts ? (
        <PostsList posts={data.userPosts} />
      ) : (
        <h1>No user posts found</h1>
      )}
    </>
  );
};
