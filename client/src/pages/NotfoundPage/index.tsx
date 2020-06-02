import React from 'react';
import { History } from 'history';

interface NotfoundPageProps {
  history: History;
}

const NotfoundPage: React.FC<NotfoundPageProps> = ({ history }) => (
  <h1>Notfound</h1>
);

export default NotfoundPage;
