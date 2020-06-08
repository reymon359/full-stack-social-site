import React from 'react';
import { History } from 'history';
import Navbar from '../../components/Navbar/index';

interface NewPostContainerProps {
  history: History;
}

export const NewPostContainer: React.FC<NewPostContainerProps> = ({
  history,
}) => {
  return (
    <>
      <Navbar history={history} />
      <h1>NewPost</h1>
    </>
  );
};
