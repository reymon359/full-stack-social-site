import React from 'react';
import { History } from 'history';
import Navbar from '../Navbar';

interface AboutContainerProps {
  history: History;
}

export const AboutContainer: React.FC<AboutContainerProps> = ({ history }) => {
  return (
    <>
      <Navbar history={history} />
      <h1>About</h1>
    </>
  );
};
