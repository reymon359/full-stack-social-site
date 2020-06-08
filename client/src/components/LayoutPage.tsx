import React, { useState } from 'react';
import Navbar from './Navbar';
import History from 'history';
import styled from 'styled-components';

const Main = styled.div`
  padding: 2rem;
`;

interface LayoutPageProps {
  history: History;
  children: React.ReactNode;
}
export const LayoutPage: React.FC<LayoutPageProps> = ({
  history,
  children,
}) => (
  <>
    {/*<Navbar history={history} />*/}
    <Main role="main">{children}</Main>
  </>
);
