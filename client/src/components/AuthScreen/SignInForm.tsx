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
  // return (
  //   <LoginFormContainer>
  //     <LoginHeading>Sign in to Fakebooker</LoginHeading>
  //     <form onSubmit={handleSubmit(onSubmit)}>
  //       <InputContainer>
  //         <Label>Email</Label>
  //         <Input
  //           name="email"
  //           ref={register({
  //             required: 'Email is required',
  //           })}
  //         />
  //         {errors && errors.email && (
  //           <ErrorMessageContainer>
  //             <ErrorIcon width={20} height={20} fill="#d93025" />
  //             <ErrorMessageHeading>{errors.email.message}</ErrorMessageHeading>
  //           </ErrorMessageContainer>
  //         )}
  //       </InputContainer>
  //       <InputContainer>
  //         <Label>Password</Label>
  //         <Input
  //           name="password"
  //           type="password"
  //           ref={register({
  //             required: 'Password is required',
  //           })}
  //         />
  //         {errors && errors.password && (
  //           <ErrorMessageContainer>
  //             <ErrorIcon width={20} height={20} fill="#d93025" />
  //             <ErrorMessageHeading>
  //               {errors.password.message}
  //             </ErrorMessageHeading>
  //           </ErrorMessageContainer>
  //         )}
  //       </InputContainer>
  //       <StyledButton htmlType="submit" disabled={loading}>
  //         Sign in
  //         {loading && (
  //           <Loader
  //             type="TailSpin"
  //             color="#fff"
  //             style={{
  //               position: 'absolute',
  //               right: '16px',
  //               top: '12px',
  //             }}
  //             height={20}
  //             width={20}
  //           />
  //         )}
  //       </StyledButton>
  //       {graphQLError && (
  //         <ErrorMessageContainer>
  //           <ErrorIcon width={20} height={20} fill="#d93025" />
  //           <ErrorMessageHeading>{graphQLError.message}</ErrorMessageHeading>
  //         </ErrorMessageContainer>
  //       )}
  //     </form>
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
