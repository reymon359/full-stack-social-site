import React from 'react';
import { History } from 'history';

interface HomePageProps {
  history: History;
}

const HomePage: React.FC<HomePageProps> = ({ history }) => <h1>Home</h1>;

export default HomePage;
