import styled from "styled-components";

const Input = styled.input`
  position: relative;
  color: ${(props) => props.theme.colors?.text};
  font-size: 2rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors?.light};
  border: 1px solid transparent;
  padding: 2.3rem 6rem 2.3rem 2rem;
  width: 100%;
  transition: border 0.2s;

  &:focus, &:focus-visible {
    border: 1px solid ${(props) => props.theme.colors?.primary}
  }
`;

export default Input;
