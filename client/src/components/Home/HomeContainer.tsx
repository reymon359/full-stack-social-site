import React from 'react';
import { History } from 'history';
import { Navbar } from '../Navbar';

interface HomeContainerProps {
  history: History;
}

export const HomeContainer: React.FC<HomeContainerProps> = ({ history }) => {
  return (
    <>
      <Navbar history={history} />
      <h1>Home</h1>
    </>
  );
};
