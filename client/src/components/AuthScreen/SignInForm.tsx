import React from 'react';
import { useCallback, useState } from 'react';
import { useSignIn } from '../../services/auth.service';
import {
  FormContainer,
  Label,
  Input,
  InputContainer,
  StyledButton,
  FormHeading,
  ErrorMessageContainer,
  ErrorMessageHeading,
} from './form-styles';

import { RouteComponentProps } from 'react-router-dom';
import LoadingSpinner from '../Shared/LoadingSpinner';

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
        setError(
          error.graphQLErrors
            ? error.graphQLErrors[0].message
            : error.message || error
        );
        setLoading(false);
      });
  }, [email, password, history, signIn]);

  return (
    <FormContainer>
      <FormHeading>Sign in to SocialQL</FormHeading>
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
          {loading && <LoadingSpinner />}
        </StyledButton>
        <ErrorMessageContainer data-testid="error-message">
          <ErrorMessageHeading>{error}</ErrorMessageHeading>
        </ErrorMessageContainer>
      </form>
    </FormContainer>
  );
};

export default SignInForm;
