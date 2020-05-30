import React from 'react';
import { useMemo } from 'react';
import { Route } from 'react-router-dom';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { RouteComponentProps } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const inverseRotate = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(-360deg) ;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg) ;
  }
`;

const dash = keyframes`
 to {
   stroke-dashoffset: 1000;
 }
`;

export const LoginPageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url('https://source.unsplash.com/1600x900/?happy,people');
`;

export const LoginPageBackground = styled.div`
  @media only screen and (min-width: 1100px) {
    display: flex;
    width: 85%;
    height: 100%;
  }
`;

export const FormContainer = styled.div`
  background-color: rgba(25, 119, 243, 0.8);
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const ActionsContainer = styled.div`
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
  font-size: 1.5rem;
  align-items: center;
  display: flex;

  @media only screen and (max-width: 480px) {
    justify-content: center;
  }
`;

// export const RegisterContainer = styled.div`
//   margin-top: 20px;
//   color: ${(props) => props.theme.secondaryText};
//   font-weight: 400;
//   font-size: 1.5rem;
//   align-items: center;
//   display: flex;

//   @media only screen and (max-width: 480px) {
//     justify-content: center;
//   }
// `;
export const AlternativeLink = styled.h1`
  font-weight: 400;
  font-size: 1.5rem;
  margin-left: 4px;
  color: ${(props) => props.theme.primaryText};
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
      <LoginPageContainer>
        <LoginPageBackground>{/* <SVGImgBackground /> */}</LoginPageBackground>
        <ActionsContainer>
          <FormContainer>
            <Route exact path="/sign-in" component={SignInForm} />
            <Route exact path="/sign-up" component={SignUpForm} />
            {alternative}
          </FormContainer>
        </ActionsContainer>
      </LoginPageContainer>
    </>
  );
};

export default AuthScreen;
