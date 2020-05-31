import React from 'react';
import { useCallback, useState } from 'react';
import { useSignUp } from '../../services/auth.service';
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
import LoadingSpinner from '../Shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router-dom';

const SignUpForm: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signUp] = useSignUp();

  const updateName = useCallback(({ target }) => {
    setError('');
    setName(target.value);
  }, []);

  const updateUsername = useCallback(({ target }) => {
    setError('');
    setUsername(target.value);
  }, []);

  const updateEmail = useCallback(({ target }) => {
    setError('');
    setEmail(target.value);
  }, []);

  const updatePassword = useCallback(({ target }) => {
    setError('');
    setPassword(target.value);
  }, []);

  const updatePasswordConfirm = useCallback(({ target }) => {
    setError('');
    setPasswordConfirm(target.value);
  }, []);

  const maySignUp = useCallback(() => {
    return !!(
      name &&
      username &&
      email &&
      password &&
      password === passwordConfirm
    );
  }, [name, username, email, password, passwordConfirm]);

  const handleSignUp = useCallback(() => {
    signUp({ variables: { name, username, email, password, passwordConfirm } })
      .then(() => {
        history.replace('/sign-in');
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);

        setError(
          error.graphQLErrors
            ? error.graphQLErrors[0].message
            : error.message || error
        );
        setLoading(false);
      });
  }, [name, username, email, password, passwordConfirm, history, signUp]);

  return (
    <FormContainer>
      <FormHeading>Sign up to SocialQL</FormHeading>
      <InputContainer>
        <Label>Name</Label>
        <Input
          data-testid="name-input"
          value={name}
          type="text"
          onChange={updateName}
          placeholder="Enter your name"
        />
      </InputContainer>

      <InputContainer>
        <Label>Username</Label>
        <Input
          data-testid="username-input"
          value={username}
          type="text"
          onChange={updateUsername}
          placeholder="Enter your username"
        />
      </InputContainer>

      <InputContainer>
        <Label>Email</Label>
        <Input
          data-testid="email-input"
          value={email}
          type="text"
          onChange={updateEmail}
          placeholder="Enter your email"
        />
      </InputContainer>

      <InputContainer>
        <Label>Password</Label>
        <Input
          data-testid="password-input"
          type="password"
          value={password}
          onChange={updatePassword}
          placeholder="Enter your password"
        />
      </InputContainer>

      <InputContainer>
        <Label>Confirm password</Label>
        <Input
          data-testid="password-confirm-input"
          type="password"
          value={passwordConfirm}
          onChange={updatePasswordConfirm}
          placeholder="Confirm your password"
        />
      </InputContainer>

      <StyledButton
        data-testid="sign-up-button"
        type="button"
        color="secondary"
        disabled={!maySignUp()}
        onClick={handleSignUp}>
        Sign up {loading && <LoadingSpinner />}
      </StyledButton>
      <MessageContainer data-testid="message">
        <MessageHeading>{error}</MessageHeading>
      </MessageContainer>
    </FormContainer>
  );
};

export default SignUpForm;
