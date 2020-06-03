import React from 'react';
import styled from 'styled-components';
// import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { useCallback } from 'react';
import { useSignOut } from '../../services/auth.service';
import { History } from 'history';
import Logo from '../Shared/Logo';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.div`
  background-color: ${(props) => props.theme.colors.light};
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 5;
  // box-shadow: 0px 1px 0px 1px ${(props) =>
    props.theme.colors.primary + '2b'};
`;

const LogoContainer = styled.div`
  padding: 1rem;
  cursor: pointer;
`;

const NavbarButton = styled.button`
  color: ${(props) => props.theme.colors.primary + '2b'};
`;

interface NavbarProps {
  history: History;
}

const Navbar: React.FC<NavbarProps> = ({ history }) => {
  const themeContext = useContext(ThemeContext);

  const signOut = useSignOut();

  const handleSignOut = useCallback(() => {
    signOut().then(() => {
      history.replace('/sign-in');
    });
  }, [history, signOut]);

  return (
    <NavbarContainer>
      <Link to="/">
        <LogoContainer>
          <Logo fill={themeContext.colors.primary} width={40} height={40} />
        </LogoContainer>
      </Link>
      <NavbarButton data-testid="sign-out-button" onClick={handleSignOut}>
        Logout
      </NavbarButton>
    </NavbarContainer>
  );
};

export default Navbar;
