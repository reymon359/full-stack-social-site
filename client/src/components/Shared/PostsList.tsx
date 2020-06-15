import React from 'react';
import { Post } from '../../graphql/types';
import styled from 'styled-components';
import PostCard from './PostCard';

const PostsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  padding: 2rem 1rem;
`;

interface PostsListProps {
  posts: Post[];
}

const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  return (
    <PostsListContainer>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </PostsListContainer>
  );
};

export default PostsList;
