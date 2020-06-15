import React from 'react';
import { History } from 'history';
import { Navbar } from '../Navbar';
import gql from 'graphql-tag';
import * as fragments from '../../graphql/fragments';
import { useGetLastPostsQuery, useUsersListQuery } from '../../graphql/types';
import ProfileDetails from '../Profile/ProfileDetails';
import { NotFoundContent } from '../NotFound';
import { stringify } from 'querystring';

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
  console.log(loadingPosts);
  // @ts-ignore
  return (
    <>
      <Navbar history={history} />
      {loadingPosts ? (
        <h1>Loading posts...</h1>
      ) : data && data.lastPosts ? (
        <div>{data.lastPosts}</div>
      ) : (
        // <PostsList posts={data.lastPosts} />
        <NotFoundContent />
      )}
      <h1>Home</h1>
    </>
  );
};
