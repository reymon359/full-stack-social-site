import React from 'react';
import { useCallback, useState } from 'react';
import {
  FormContainer,
  Label,
  Input,
  InputContainer,
  StyledButton,
  FormHeading,
  MessageContainer,
  MessageHeading,
} from './../Auth/AuthForms/AuthForms.styles';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { History } from 'history';
import { useAddPostMutation } from '../../graphql/types';
import gql from 'graphql-tag';

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
    return !!(title && description && picture && content);
  }, [title, description, picture, content]);

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
        <Input
          data-testid="content-input"
          type="textarea"
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
