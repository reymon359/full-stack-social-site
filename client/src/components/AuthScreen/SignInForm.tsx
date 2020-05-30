import React from 'react';
import { useCallback, useState } from 'react';
import { useSignIn } from '../../services/auth.service';
import {
  SignForm,
  ActualForm,
  Legend,
  Section,
  TextField,
  Button,
  ErrorMessage,
} from './form-components';
import { RouteComponentProps } from 'react-router-dom';

const SignInForm: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const [email, setEmail] = useState('');
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
    signIn({ variables: { email, password } })
      .then(() => {
        history.replace('/chats');
      })
      .catch((error) => {
        setError(error.message || error);
      });
  }, [email, password, history, signIn]);

  return (
    <SignForm>
      <ActualForm>
        <Legend>Sign in</Legend>
        <Section style={{ width: '100%' }}>
          <TextField
            data-testid="email-input"
            label="Email"
            value={email}
            onChange={onEmailChange}
            margin="normal"
            placeholder="Enter your email"
          />
          <TextField
            data-testid="password-input"
            label="Password"
            type="password"
            value={password}
            onChange={onPasswordChange}
            margin="normal"
            placeholder="Enter your password"
          />
        </Section>
        <Button
          data-testid="sign-in-button"
          type="button"
          color="secondary"
          variant="contained"
          disabled={!maySignIn()}
          onClick={handleSignIn}>
          Sign in
        </Button>
        <ErrorMessage data-testid="error-message">{error}</ErrorMessage>
      </ActualForm>
    </SignForm>
  );
};

export default SignInForm;
