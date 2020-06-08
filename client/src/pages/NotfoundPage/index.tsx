import React from 'react';
import { History } from 'history';
import Navbar from '../../components/Navbar';
import NotFoundContainer from '../../components/NotFoundContainer';

interface NotfoundPageProps {
  history: History;
}

const NotfoundPage: React.FC<NotfoundPageProps> = ({ history }) => (
  <>
    <Navbar history={history} />
    <NotFoundContainer />
  </>
);

export default NotfoundPage;
