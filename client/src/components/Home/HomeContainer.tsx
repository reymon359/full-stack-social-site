import React from 'react';
import { History } from 'history';
import { Navbar } from '../Navbar';
import gql from 'graphql-tag';
import * as fragments from '../../graphql/fragments';
import { useGetLastPostsQuery } from '../../graphql/types';
import PostsList from '../Shared/PostsList';

// eslint-disable-next-line
const getLastPostsQuery = gql`
  query GetLastPosts {
    lastPosts {
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

interface HomeContainerProps {
  history: History;
}

export const HomeContainer: React.FC<HomeContainerProps> = ({ history }) => {
  const { data, loading: loadingPosts } = useGetLastPostsQuery();
  console.log(data);
  return (
    <>
      <Navbar history={history} />
      {loadingPosts ? (
        <h1>Loading posts...</h1>
      ) : data && data.lastPosts ? (
        <PostsList posts={data.lastPosts} />
      ) : (
        <h1>No posts found</h1>
      )}
    </>
  );
};
