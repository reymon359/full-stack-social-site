import React from 'react';
import { History } from 'history';
import Navbar from '../../components/Navbar/index';

interface AboutPageProps {
  history: History;
}

const AboutPage: React.FC<AboutPageProps> = ({ history }) => {
  return (
    <>
      <Navbar history={history} />
      <h1>About</h1>
    </>
  );
};

export default AboutPage;
