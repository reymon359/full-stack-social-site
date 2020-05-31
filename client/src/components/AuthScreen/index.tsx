import React from 'react';
import { useMemo } from 'react';
import { Route } from 'react-router-dom';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

const Authcontainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100%;
  background-size: cover;
  background: url('https://source.unsplash.com/1600x900/?happy,people')
    no-repeat center center;
`;

const AuthSide = styled.div`
  display: flex;
  width: 85%;
  height: 100%;
  ${(props) => props.theme.media.sm`
     display: none;
 `}
`;

const FormContainer = styled.div`
  background-color: ${(props) => props.theme.colors.darkBlue + '90'};
  color: ${(props) => props.theme.colors.white};
  font-size: 0.9rem;
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Alternative = styled.div`
  margin-top: 20px;
  color: ${(props) => props.theme.secondaryText};
  font-weight: 400;
  font-size: ${(props) => props.theme.fontSizes.medium};
  align-items: center;
  display: flex;

  ${(props) => props.theme.media.sm`
    justify-content: center;
  `}
`;

const AlternativeLink = styled.h1`
  font-weight: 400;
  font-size: ${(props) => props.theme.fontSizes.medium};
  margin-left: 4px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.lightBlue};

  &:hover {
    color: ${(props) => props.theme.colors.blue};
  }
`;

const AuthScreen: React.FC<RouteComponentProps<any>> = ({
  history,
  location,
}) => {
  const alternative = useMemo(() => {
    if (location.pathname === '/sign-in') {
      const handleSignUp = () => {
        history.replace('/sign-up');
      };

      return (
        <Alternative>
          Not a member?
          <AlternativeLink onClick={handleSignUp}>Sign up now</AlternativeLink>
        </Alternative>
      );
    } else {
      const handleSignIn = () => {
        history.replace('/sign-in');
      };

      return (
        <Alternative>
          Already have an accout?
          <AlternativeLink onClick={handleSignIn}>Sign in!</AlternativeLink>
        </Alternative>
      );
    }
  }, [location.pathname, history]);

  return (
    <>
      <Authcontainer>
        <AuthSide />
        <ActionsContainer>
          <FormContainer>
            <Route exact path="/sign-in" component={SignInForm} />
            <Route exact path="/sign-up" component={SignUpForm} />
            {alternative}
          </FormContainer>
        </ActionsContainer>
      </Authcontainer>
    </>
  );
};

export default AuthScreen;
