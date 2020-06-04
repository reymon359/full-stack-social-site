import React from 'react';
import { History } from 'history';
import Navbar from '../../components/Navbar/index';

interface NewPostPageProps {
  history: History;
}

const NewPostPage: React.FC<NewPostPageProps> = ({ history }) => {
  return (
    <>
      <Navbar history={history} />
      <h1>NewPost</h1>
    </>
  );
};

export default NewPostPage;
