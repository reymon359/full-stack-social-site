import React from 'react';
import { useCallback, useState } from 'react';
import { useSignIn } from '../../services/auth.service';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import {
  // SignForm,
  // ActualForm,
  // Legend,
  Section,
  TextField,
  Button,
  ErrorMessage,
} from './form-components';

import {
  LoginFormContainer,
  Label,
  Input,
  InputContainer,
  StyledButton,
  LoginHeading,
  ErrorMessageContainer,
  ErrorMessageHeading,
  RegisterContainer,
  RegisterLink,
} from './form-styles';

import { RouteComponentProps } from 'react-router-dom';

const SignInForm: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signIn] = useSignIn();

  const onEmailChange = useCallback(({ target }) => {
    setError('');
    setEmail(target.value);
  }, []);

  const onPasswordChange = useCallback(({ target }) => {
    setError('');
    setPassword(target.value);
  }, []);

  const maySignIn = useCallback(() => {
    return !!(email && password);
  }, [email, password]);

  const handleSignIn = useCallback(() => {
    setLoading(true);
    signIn({ variables: { email, password } })
      .then(() => {
        history.replace('/chats');
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || error);
        setLoading(false);
      });
  }, [email, password, history, signIn]);

  return (
    <LoginFormContainer>
      <LoginHeading>Sign in to SocialSite</LoginHeading>
      {/* <SignForm> */}
      {/* <ActualForm> */}
      {/* <Legend>Sign in</Legend> */}
      <form>
        <div>
          <InputContainer>
            <Label>Email</Label>
            <Input
              data-testid="email-input"
              value={email}
              onChange={onEmailChange}
              placeholder="Enter your email"
            />
          </InputContainer>
        </div>
        <div>
          <InputContainer>
            <Label>Password</Label>
            <Input
              data-testid="password-input"
              type="password"
              value={password}
              onChange={onPasswordChange}
              placeholder="Enter your password"
            />
          </InputContainer>
        </div>
        <StyledButton
          data-testid="sign-in-button"
          type="button"
          disabled={!maySignIn()}
          onClick={handleSignIn}>
          Sign in
          {loading && (
            <div
              style={{
                position: 'absolute',
                right: '16px',
                top: '12px',
              }}>
              <Loader type="Rings" color="#fff" height={20} width={20} />
            </div>
          )}
        </StyledButton>
        <ErrorMessageContainer data-testid="error-message">
          <ErrorMessageHeading>{error}</ErrorMessageHeading>
        </ErrorMessageContainer>
      </form>
    </LoginFormContainer>
  );
  // return (

  //     <RegisterContainer>
  //       Not a member?
  //       <Link to="/register">
  //         <RegisterLink>Sign up now</RegisterLink>
  //       </Link>
  //     </RegisterContainer>
  //   </LoginFormContainer>
  // );
};

export default SignInForm;
