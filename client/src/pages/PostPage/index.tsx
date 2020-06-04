import React from 'react';
import { History } from 'history';
import Navbar from '../../components/Navbar';

interface PostPageProps {
  history: History;
}

const PostPage: React.FC<PostPageProps> = ({ history }) => {
  return (
    <>
      <Navbar history={history} />
      <h1>Post</h1>
    </>
  );
};

export default PostPage;
