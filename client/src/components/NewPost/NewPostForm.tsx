import React from 'react';
import { useCallback, useState } from 'react';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { History } from 'history';
import { useAddPostMutation } from '../../graphql/types';
import gql from 'graphql-tag';
import styled from 'styled-components';

// eslint-disable-next-line
const addPostMutation = gql`
  mutation AddPost(
    $title: String!
    $picture: String
    $description: String!
    $content: String!
  ) {
    addPost(
      title: $title
      picture: $picture
      description: $description
      content: $content
    ) {
      id
    }
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px auto;
  padding: 2rem 1rem;
  max-width: 700px;

  ${(props) => props.theme.media.md`
    width: 90%;
  `}
`;

const FormHeading = styled.p`
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: 600;
  margin-bottom: 30px;
`;

const Label = styled.p`
  display: inline-block;
  margin: 0;
  margin-bottom: 7px;
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: 600;
  line-height: 1;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled.input`
  border: 2px solid ${(props) => props.theme.colors.mediumdark};
  border-radius: 5px;
  height: 40px;
  padding: 0 8px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border: 2px solid ${(props) => props.theme.colors.primary};
  }
`;

const Textarea = styled.textarea`
  border: 2px solid ${(props) => props.theme.colors.mediumdark};
  font-family: ${(props) => props.theme.fonts.primary};
  border-radius: 5px;
  height: 120px;
  padding: 8px;
  box-sizing: border-box;
  resize: vertical;
  &:focus {
    outline: none;
    border: 2px solid ${(props) => props.theme.colors.primary};
  }
`;

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.darkest};
  color: ${(props) => props.theme.colors.lightest};
  position: relative;
  width: 50%;
  height: auto;
  padding: 10px 50px;
  border-radius: 5px;
  font-size: ${(props) => props.theme.fontSizes.medium};
  border: none;
  cursor: pointer;

  &[disabled] {
    background-color: ${(props) => props.theme.colors.mediumdark};
    cursor: default;
  }

  &:not([disabled]) {
    background-color: ${(props) => props.theme.colors.primary};
  }
  &:focus {
    outline: none;
  }

  &:focus:enabled,
  &:hover:enabled {
    background-color: ${(props) => props.theme.colors.primaryLight};
  }

  &:active {
    color: ${(props) => props.theme.colors.lightest};
    border-color: none;
    transform: scale(0.96);
  }

  ${(props) => props.theme.media.sm`
    width: 100%;
  `}
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  margin-top: 10px;
`;

const MessageHeading = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: 800;
  margin-left: 7px;
`;

interface NewPostFormProps {
  history: History;
}
const NewPostForm: React.FC<NewPostFormProps> = ({ history }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [addPost] = useAddPostMutation();

  const updateTile = useCallback(({ target }) => {
    setMessage('');
    setTitle(target.value);
  }, []);

  const updateDescription = useCallback(({ target }) => {
    setMessage('');
    setDescription(target.value);
  }, []);

  const updatePicture = useCallback(({ target }) => {
    setMessage('');
    setPicture(target.value);
  }, []);

  const updateContent = useCallback(({ target }) => {
    setMessage('');
    setContent(target.value);
  }, []);

  const mayAddNewPost = useCallback(() => {
    return !!(title && description && content);
  }, [title, description, content]);

  const handleAddPost = useCallback(() => {
    addPost({ variables: { title, description, picture, content } })
      .then((data: any) => {
        setMessage('🎉 New Post Created!');
        setTimeout(() => {
          history.replace(`/post/${data.data.addPost.id}`);
          setLoading(false);
        }, 2000);
      })
      .catch((error: any) => {
        console.error(error);

        setMessage(
          error.graphQLErrors
            ? error.graphQLErrors[0].message
            : error.message || error
        );
        setLoading(false);
      });
  }, [title, description, picture, content, history, addPost]);

  return (
    <FormContainer>
      <FormHeading>New Post Form</FormHeading>
      <InputContainer>
        <Label>Title</Label>
        <Input
          data-testid="title-input"
          value={title}
          type="text"
          onChange={updateTile}
          placeholder="Enter the post title"
        />
      </InputContainer>

      <InputContainer>
        <Label>Description</Label>
        <Input
          data-testid="description-input"
          value={description}
          type="text"
          onChange={updateDescription}
          placeholder="Enter your description"
        />
      </InputContainer>

      <InputContainer>
        <Label>Picture</Label>
        <Input
          data-testid="picture-input"
          value={picture}
          type="text"
          onChange={updatePicture}
          placeholder="Enter the post picture url (not required)"
        />
      </InputContainer>

      <InputContainer>
        <Label>Content</Label>
        <Textarea
          data-testid="content-input"
          value={content}
          onChange={updateContent}
          placeholder="Enter the post content"
        />
      </InputContainer>

      <StyledButton
        data-testid="add-post-button"
        type="button"
        color="secondary"
        disabled={!mayAddNewPost()}
        onClick={handleAddPost}>
        Add new post {loading && <LoadingSpinner />}
      </StyledButton>
      <MessageContainer>
        <MessageHeading data-testid="message">{message}</MessageHeading>
      </MessageContainer>
    </FormContainer>
  );
};

export default NewPostForm;
