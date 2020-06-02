import React from 'react';
import { History } from 'history';
import Navbar from '../../components/Navbar/index';

interface HomePageProps {
  history: History;
}

const HomePage: React.FC<HomePageProps> = ({ history }) => {
  return (
    <>
      <Navbar history={history} />
      <h1>Home</h1>
    </>
  );
};

export default HomePage;
