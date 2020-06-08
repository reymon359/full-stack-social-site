import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
  padding: 2rem;
`;

interface LayoutContainerProps {
  children: React.ReactNode;
}
export const LayoutContainer: React.FC<LayoutContainerProps> = ({
  children,
}) => (
  <>
    <Main role="main">{children}</Main>
  </>
);
