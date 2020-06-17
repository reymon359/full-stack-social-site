import React from 'react';
import { Post } from '../../graphql/types';
import styled from 'styled-components';
import { timeFromNow } from '../../utils/timeFromNow';
import { Link } from 'react-router-dom';

const PostCardContainer = styled.div`
  margin: 1.6rem 0;
  max-width: 600px;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0px 0px 5px 1px ${(props) => props.theme.colors.medium};
  cursor: pointer;
  transition: 0.5s;
  color: ${(props) => props.theme.colors.darker};

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
const PostCreatedAt = styled.p`
  margin-top: 10px;
`;

const PostCardBody = styled.div``;

type PostPictureProps = {
  url: string;
};

const PostPicture = styled.div<PostPictureProps>`
  background-size: cover;
  width: 100%;
  min-height: 250px;
  border-radius: 5px;
  background-image: url('${(props) => props.url}');
`;

const PostTitle = styled.h1`
  padding: 1rem 0.5rem 0.5rem;
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: ${(props) => props.theme.fontWeights.regular};
`;

const PostDescription = styled.p`
  padding: 0.5rem;
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeights.regular};
`;

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const createdAtTfn = timeFromNow(new Date(post.createdAt));

  return (
    <Link to={`/post/${post.id}`}>
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
            <PostCreatedAt data-testid="post-created-at">{`${createdAtTfn?.time} ${createdAtTfn?.unitOfTime} ago`}</PostCreatedAt>
          </UsernameAndCreatedAtWrapper>
        </PostCardHeader>
        <PostCardBody>
          <PostPicture data-testid="post-picture" url={post.picture} />
          <PostTitle data-testid="post-title">{post.title}</PostTitle>
          <PostDescription data-testid="post-description">
            {post.description}
          </PostDescription>
        </PostCardBody>
      </PostCardContainer>
    </Link>
  );
};

export default PostCard;
