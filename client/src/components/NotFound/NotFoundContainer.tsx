import React, { useCallback } from 'react';
import { History } from 'history';
import { Navbar } from '../Navbar';
import { NotFoundContent } from './NotFoundContent';
import { useMe } from '../../services/auth.service';

interface NotFoundContainerProps {
  history: History;
}

export const NotFoundContainer: React.FC<NotFoundContainerProps> = ({
  history,
}) => {
  return (
    <>
      <Navbar history={history} />
      <NotFoundContent />
    </>
  );
};
