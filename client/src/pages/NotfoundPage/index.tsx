import React from 'react';
import { History } from 'history';
import Navbar from '../../components/Navbar';

interface NotfoundPageProps {
  history: History;
}

const NotfoundPage: React.FC<NotfoundPageProps> = ({ history }) => (
  <>
    <Navbar history={history} />
    <h1>404</h1>
  </>
);

export default NotfoundPage;
