import styled from "styled-components";

const ButtonDelete = styled.button`
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  transition: fill 0.2s;
  fill: ${(props) => props.theme.colors.secondary};

  &:hover {
    fill: ${(props) => props.theme.colors.accent};
  }
`;

export default ButtonDelete;