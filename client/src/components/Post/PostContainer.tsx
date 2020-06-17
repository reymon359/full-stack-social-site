import React from 'react';
import { History } from 'history';
import { Navbar } from '../Navbar';
import gql from 'graphql-tag';
import * as fragments from '../../graphql/fragments';
import { useGetPostByIdQuery } from '../../graphql/types';

// eslint-disable-next-line
const getPostByIdQuery = gql`
  query GetPostById($postId: ID!) {
    post(postId: $postId) {
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

interface PostContainerProps {
  history: History;
  postId: string;
}

export const PostContainer: React.FC<PostContainerProps> = ({
  history,
  postId,
}) => {
  console.log(postId);
  // const { loading: loadingPost, data } = useGetPostByIdQuery({
  //   variables: { postId },
  // });

  return (
    <>
      <Navbar history={history} />
      {/*{loadingPost? (*/}
      {/*  <h1>Loading post...</h1>*/}
      {/*) : data && data.post ? (*/}
      {/*  <PostsList posts={dataata.lastPosts} />*/}
      {/*) : (*/}
      {/*  <h1>No posts found</h1>*/}
      {/*)}*/}
    </>
  );
};
