import React from 'react';
import { Post } from '../../graphql/types';
import styled from 'styled-components';

const PostCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  padding: 2rem 1rem;
`;

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <PostCardContainer>
      <div>{post.title}</div>
      <div>{post.description}</div>
      <img src={post.picture} alt="" />
    </PostCardContainer>
  );
};

export default PostCard;
