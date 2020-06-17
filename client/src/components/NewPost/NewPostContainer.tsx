import React from 'react';
import { History } from 'history';
import { Navbar } from '../Navbar';
import NewPostForm from './NewPostForm';

interface NewPostContainerProps {
  history: History;
}

export const NewPostContainer: React.FC<NewPostContainerProps> = ({
  history,
}) => {
  return (
    <>
      <Navbar history={history} />
      <NewPostForm history={history} />
    </>
  );
};
