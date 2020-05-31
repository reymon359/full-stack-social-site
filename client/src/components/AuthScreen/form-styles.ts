import styled from "styled-components";

export const FormContainer = styled.div`
  width: 400px;

  ${(props) => props.theme.media.md`
    width: 90%;
  `}
`;

export const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.primaryText};
  color:${(props) => props.theme.colors.white};
  position: relative;
  width: 50%;
  height: auto;
  padding: 10px 50px;
  border-radius: 5px;
  font-size: ${(props) => props.theme.fontSizes.medium};;
  border: none;
  cursor: pointer;
  
  &[disabled] {
    background-color: ${(props) => props.theme.colors.gray};
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
    background-color: ${(props) => props.theme.colors.lightBlue};
  }

  &:active {
    color: ${(props) => props.theme.colors.white};
    border-color: none;
    transform: scale(0.96);
  }

  ${(props) => props.theme.media.sm`
    width: 100%;
  `}
`;

export const FormHeading = styled.p`
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: 600;
  margin-bottom: 30px;
  color: ${(props) => props.theme.colors.secondaryText};
`;

export const Label = styled.p`
  display: inline-block;
  margin: 0;
  margin-bottom: 7px;
  font-size: ${(props) => props.theme.fontSizes.medium};;
  font-weight: 600;
  line-height: 1;
  color: ${(props) => props.theme.colors.secondaryText};
`;

export const Input = styled.input`
  background-color: ${(props) => props.theme.inputColor};
  border: none;
  border-radius: 5px;
  height: 40px;
  padding: 0 8px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border: 2px solid ${(props) => props.theme.colors.primary};
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const ErrorMessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  margin-top: 10px;
`;

export const ErrorMessageHeading = styled.h1`
  color: ${(props) => props.theme.colors.lightDanger};
  font-size: ${(props) => props.theme.fontSizes.medium};;
  font-weight: 800;
  margin-left: 7px;
`;

