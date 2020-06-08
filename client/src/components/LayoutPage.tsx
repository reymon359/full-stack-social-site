import React, { useState } from 'react';
import Navbar from './Navbar';
import History from 'history';
import styled from 'styled-components';

const Main = styled.div`
  padding: 2rem;
`;

interface LayoutContainerProps {
  history: History;
  children: React.ReactNode;
}
export const LayoutContainer: React.FC<LayoutContainerProps> = ({
  history,
  children,
}) => (
  <>
    {/*<Navbar history={history} />*/}
    <Main role="main">{children}</Main>
  </>
);
