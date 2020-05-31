import React, { useCallback, useState, useContext } from 'react';
import { useSignIn } from '../../services/auth.service';
import {
  FormContainer,
  Label,
  Input,
  InputContainer,
  StyledButton,
  FormHeading,
  MessageContainer,
  MessageHeading,
} from './form-styles';

import { RouteComponentProps } from 'react-router-dom';
import LoadingSpinner from '../Shared/LoadingSpinner';

const SignInForm: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [signIn] = useSignIn();

  const onEmailChange = useCallback(({ target }) => {
    setMessage('');
    setEmail(target.value);
  }, []);

  const onPasswordChange = useCallback(({ target }) => {
    setMessage('');
    setPassword(target.value);
  }, []);

  const maySignIn = useCallback(() => {
    return !!(email && password);
  }, [email, password]);

  const handleSignIn = useCallback(() => {
    setLoading(true);
    signIn({ variables: { email, password } })
      .then(() => {
        setMessage('✅ Sign In succesfull!');
        setTimeout(() => {
          history.replace('/chats');
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        setMessage(
          error.graphQLErrors
            ? error.graphQLErrors.length > 0
              ? error.graphQLErrors[0].message
              : error.message || error
            : '❌ Unknown Error'
        );
        setLoading(false);
      });
  }, [email, password, history, signIn]);

  return (
    <FormContainer>
      <FormHeading>Sign in to SocialQL</FormHeading>
      <InputContainer>
        <Label>Email</Label>
        <Input
          data-testid="email-input"
          value={email}
          type="text"
          onChange={onEmailChange}
          placeholder="Enter your email"
        />
      </InputContainer>
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
      <StyledButton
        data-testid="sign-in-button"
        type="button"
        disabled={!maySignIn()}
        onClick={handleSignIn}>
        Sign in
        {loading && <LoadingSpinner />}
      </StyledButton>
      <MessageContainer data-testid="message">
        <MessageHeading>{message}</MessageHeading>
      </MessageContainer>
    </FormContainer>
  );
};

export default SignInForm;
