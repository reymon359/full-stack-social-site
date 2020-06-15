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

const PostCardHeader = styled.div`
  display: flex;
  margin-bottom: 0;
  padding: 10px;
`;

const PostUserPicture = styled.img`
  border-radius: 100%;
  border: 3px solid ${(props) => props.theme.colors.primaryDark};

  height: 50px;
  width: 50px;
`;

const UsernameAndCreatedAtWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const PostUserUsername = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.mediumLarge};
  font-weight: ${(props) => props.theme.fontWeights.regular};
`;
const PostCreatedAt = styled.p``;

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
        <UsernameAndCreatedAtWrapper>
          <PostUserUsername data-testid="post-user-username">
            {post.user?.username}
          </PostUserUsername>
          <PostCreatedAt data-testid="post-created-at">
            {new Date(post.createdAt).toTimeString()}
          </PostCreatedAt>
        </UsernameAndCreatedAtWrapper>
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
