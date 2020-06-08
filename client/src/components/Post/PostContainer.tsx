import React from 'react';
import { History } from 'history';
import { Navbar } from '../Navbar';

interface PostContainerProps {
  history: History;
}

export const PostContainer: React.FC<PostContainerProps> = ({ history }) => {
  return (
    <>
      <Navbar history={history} />
      <h1>Post</h1>
    </>
  );
};
