import React, { useCallback, useEffect, useState } from 'react';
import {
  Post,
  useLikePostMutation,
  useUnlikePostMutation,
  useGetUserLikedPostsIdsQuery,
} from '../../graphql/types';
import styled from 'styled-components';
import { useMe } from '../../services/auth.service';
import gql from 'graphql-tag';
import * as fragments from '../../graphql/fragments';

type PostButtonProps = {
  color: string;
};
const PostButton = styled.button<PostButtonProps>`
  color: ${(props) => props.theme.colors[props.color]};
  background-color: ${(props) => props.theme.colors.lightest};
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  border: none;
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.25s;
  min-width: 80px;

  &:hover {
    box-shadow: 0px 0px 5px 1px ${(props) => props.theme.colors.medium};
  }
  &:active {
    transform: scale(1.1);
  }

  ${(props) => props.theme.media.sm`
    font-size: ${props.theme.fontSizes.normal};
 `}
`;

const PostLikesNumber = styled.div`
  margin: 0 10px;
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  ${(props) => props.theme.media.sm`
    font-size: ${props.theme.fontSizes.normal};
 `}
`;

// eslint-disable-next-line
const getUserLikedPostsIdsQuery = gql`
  query GetUserLikedPostsIds($userId: ID!) {
    userLikedPosts(userId: $userId) {
      id
    }
  }
  ${fragments.user}
`;

// eslint-disable-next-line
const likePostMutation = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId)
  }
`;

// eslint-disable-next-line
const unlikePostMutation = gql`
  mutation UnlikePost($postId: ID!) {
    unlikePost(postId: $postId)
  }
`;

interface PostLikesProps {
  isCurrentUserPost: boolean | null;
  post: Post;
}

const PostLikes: React.FC<PostLikesProps> = ({ isCurrentUserPost, post }) => {
  const currentUser = useMe();
  const [userLikedThePost, setUserLikedThePost] = useState(false);
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const userId = currentUser?.id;
  const { data: userLikedPosts } = useGetUserLikedPostsIdsQuery({
    //@ts-ignore
    variables: { userId },
  });

  useEffect(() => {
    const booleanAux = userLikedPosts?.userLikedPosts
      .map(
        // @ts-ignore
        (postId) => (postId = postId?.id)
      )
      .includes(post?.id);
    // @ts-ignore
    setUserLikedThePost(booleanAux);
  }, [post, userLikedPosts]);

  const handleLikePost = useCallback(() => {
    likePost({ variables: { postId: post.id } })
      .then((data: any) => {
        post.likes++;
        setUserLikedThePost(
          data.data.likePost !== null && data.data.likePost === post.id
        );
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, [post.id, post.likes, likePost]);
  const handleUnlikePost = useCallback(() => {
    unlikePost({ variables: { postId: post.id } })
      .then((data: any) => {
        post.likes--;
        setUserLikedThePost(
          !(data.data.unlikePost !== null && data.data.unlikePost === post.id)
        );
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, [post.id, post.likes, unlikePost]);

  return (
    <>
      {userLikedThePost
        ? !isCurrentUserPost && (
            <PostButton
              color="primary"
              data-testid="post-like-button"
              onClick={handleUnlikePost}>
              Unlike
            </PostButton>
          )
        : !isCurrentUserPost && (
            <PostButton
              color="primary"
              data-testid="post-like-button"
              onClick={handleLikePost}>
              Like
            </PostButton>
          )}
      <PostLikesNumber data-testid="post-likes-number">
        {post.likes} Likes
      </PostLikesNumber>
    </>
  );
};

export default PostLikes;
