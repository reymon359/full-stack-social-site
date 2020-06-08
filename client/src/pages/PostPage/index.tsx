import React from 'react';
import { History } from 'history';
import Navbar from '../../components/Navbar';

interface PostContainerProps {
  history: History;
}

const PostContainer: React.FC<PostContainerProps> = ({ history }) => {
  return (
    <>
      <Navbar history={history} />
      <h1>Post</h1>
    </>
  );
};

export default PostContainer;
