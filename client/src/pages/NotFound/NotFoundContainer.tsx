import React from 'react';
import { History } from 'history';
import Navbar from '../../components/Navbar';
import NotFoundContainer from '../../components/NotFoundContainer';

interface NotfoundContainerProps {
  history: History;
}

export const NotfoundContainer: React.FC<NotfoundContainerProps> = ({
  history,
}) => (
  <>
    <Navbar history={history} />
    <NotFoundContainer />
  </>
);
