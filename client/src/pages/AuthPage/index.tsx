import React from 'react';
import { useMemo } from 'react';
import { Route } from 'react-router-dom';
import SignInForm from '../../components/AuthForms/SignInForm';
import SignUpForm from '../../components/AuthForms/SignUpForm';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

const AuthBackCoverImage = styled.div`
  background-size: cover;
  width: 100%;
  height: 100%;
  background-image: url('https://source.unsplash.com/1600x900/?happy,people');
`;

const Authcontainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100%;
`;

const AuthSide = styled.div`
  display: flex;
  width: 85%;
  height: 100%;
  ${(props) => props.theme.media.sm`
     display: none;
 `}
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  background: radial-gradient(
      circle at 25% 54%,
      rgba(18, 18, 18, 0.06) 0%,
      rgba(18, 18, 18, 0.06) 22%,
      transparent 22%,
      transparent 100%
    ),
    radial-gradient(
      circle at 67% 98%,
      rgba(223, 223, 223, 0.06) 0%,
      rgba(223, 223, 223, 0.06) 52%,
      transparent 52%,
      transparent 100%
    ),
    radial-gradient(
      circle at 7% 92%,
      rgba(169, 169, 169, 0.06) 0%,
      rgba(169, 169, 169, 0.06) 52%,
      transparent 52%,
      transparent 100%
    ),
    radial-gradient(
      circle at 46% 37%,
      rgba(187, 187, 187, 0.06) 0%,
      rgba(187, 187, 187, 0.06) 47%,
      transparent 47%,
      transparent 100%
    ),
    radial-gradient(
      circle at 38% 35%,
      rgba(57, 57, 57, 0.06) 0%,
      rgba(57, 57, 57, 0.06) 99%,
      transparent 99%,
      transparent 100%
    ),
    radial-gradient(
      circle at 46% 86%,
      rgba(100, 100, 100, 0.06) 0%,
      rgba(100, 100, 100, 0.06) 60%,
      transparent 60%,
      transparent 100%
    ),
    linear-gradient(
      90deg,
      ${(props) => props.theme.colors.primary + 'd1'},
      ${(props) => props.theme.colors.primaryLight + 'd1'}
    );
  color: ${(props) => props.theme.colors.lightest};
  font-size: 0.9rem;
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  overflow: auto;
`;

const Alternative = styled.div`
  margin-top: 20px;
  color: ${(props) => props.theme.colors.lightest};
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
  color: ${(props) => props.theme.colors.primaryDark};

  &:hover {
    color: ${(props) => props.theme.colors.secondaryDark};
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
          Already have an account?
          <AlternativeLink onClick={handleSignIn}>Sign in!</AlternativeLink>
        </Alternative>
      );
    }
  }, [location.pathname, history]);

  return (
    <>
      <AuthBackCoverImage>
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
      </AuthBackCoverImage>
    </>
  );
};

export default AuthScreen;
