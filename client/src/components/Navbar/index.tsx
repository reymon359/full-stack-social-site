import React from 'react';
import styled from 'styled-components';
import { useCallback } from 'react';
import { useSignOut } from '../../services/auth.service';
import { History } from 'history';

export const NavbarContainer = styled.div`
  background-color: ${(props) => props.theme.colors.lightest};
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Roboto;
  position: sticky;
  top: 0;
  z-index: 5;
  box-shadow: ${(props) => props.theme.colors.boxShadow1};
`;

const Title = styled.div`
  flex: 1;
`;

const LogoutButton = styled.button`
  color: var(--primary-text) !important;
`;

interface NavbarProps {
  history: History;
}

const Navbar: React.FC<NavbarProps> = ({ history }) => {
  const signOut = useSignOut();

  const handleSignOut = useCallback(() => {
    signOut().then(() => {
      history.replace('/sign-in');
    });
  }, [history, signOut]);

  return (
    <NavbarContainer>
      <Title>SocialQL</Title>
      <LogoutButton data-testid="sign-out-button" onClick={handleSignOut}>
        Logout
      </LogoutButton>
    </NavbarContainer>
  );
};

export default Navbar;
