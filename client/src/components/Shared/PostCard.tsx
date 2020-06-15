import React from 'react';
import { Post } from '../../graphql/types';
import styled from 'styled-components';

const PostCardContainer = styled.div`
  margin: 1.6rem 0;
  max-width: 600px;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0px 0px 5px 1px ${(props) => props.theme.colors.medium};
  cursor: pointer;
  transition: 0.5s;

  &:hover,
  &:focus {
    box-shadow: 0px 0px 15px 2px ${(props) => props.theme.colors.medium};
  }
`;

const PostCardHeader = styled.div``;

const PostUserPicture = styled.img``;

const PostUserUsername = styled.div``;
const PostCreatedAt = styled.div``;

const PostCardBody = styled.div``;
const PostPicture = styled.img`
  width: 90%;
`;

const PostTitle = styled.h1``;

const PostDescription = styled.p``;

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <PostCardContainer>
      <PostCardHeader>
        <PostUserPicture
          data-testid="post-user-picture"
          src={post.user?.picture}
        />
        <PostUserUsername data-testid="post-user-username">
          {post.user?.username}
        </PostUserUsername>
        <PostCreatedAt data-testid="post-created-at">
          {post.createdAt}
        </PostCreatedAt>
      </PostCardHeader>
      <PostCardBody>
        <PostPicture data-testid="post-picture" src={post.picture} />
        <PostTitle data-testid="post-title">{post.title}</PostTitle>
        <PostDescription data-testid="post-description">
          {post.description}
        </PostDescription>
      </PostCardBody>
    </PostCardContainer>
  );
};

export default PostCard;
