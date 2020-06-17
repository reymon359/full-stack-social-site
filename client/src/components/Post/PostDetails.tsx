import React from 'react';
import { Post, User } from '../../graphql/types';
import styled from 'styled-components';
import { useMe } from '../../services/auth.service';

const PostDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  padding: 2rem 1rem;
  max-width: 700px;
`;
const PostDetailsHeader = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 0;
  padding: 10px;
  justify-content: space-between;
`;
const PostUserInfo = styled.div`
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
const PostLikesContainer = styled.div``;
const PostLikesNumber = styled.div``;
const PostLikeButton = styled.button``;

const PostDetailsBody = styled.div``;
const PostIntro = styled.div``;
const PostTitle = styled.h1``;
const PostDescription = styled.p``;
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

const PostContent = styled.div``;

interface PostDetailsProps {
  post: Post;
}

const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
  const currentUser = useMe();
  const isCurrentUserPost = currentUser && post?.user?.id === currentUser.id;

  return (
    <PostDetailsContainer>
      <PostDetailsHeader>
        <PostUserInfo>
          <PostUserPicture
            data-testid="post-user-picture"
            src={post.user?.picture}
          />
          <UsernameAndCreatedAtWrapper>
            <PostUserUsername data-testid="post-user-username">
              {post.user?.username}
            </PostUserUsername>
            <PostCreatedAt data-testid="post-created-at">
              {post.createdAt.slice(0, 10)}
            </PostCreatedAt>
          </UsernameAndCreatedAtWrapper>
        </PostUserInfo>
        <PostLikesContainer>
          <PostLikesNumber data-testid="post-likes-number">
            {post.likes}
          </PostLikesNumber>
          <PostLikeButton data-testid="post-like-button" />
        </PostLikesContainer>
      </PostDetailsHeader>
      <PostDetailsBody>
        <PostIntro>
          <PostTitle data-testid="post-title">{post.title}</PostTitle>
          <PostDescription data-testid="post-description">
            {post.description}
          </PostDescription>
        </PostIntro>
        <PostPicture data-testid="post-picture" url={post.picture} />
        <PostContent data-testid="post-content">{post.content}</PostContent>
      </PostDetailsBody>
    </PostDetailsContainer>
  );
};

export default PostDetails;
