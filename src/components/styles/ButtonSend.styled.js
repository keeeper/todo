import styled from "styled-components";

const ButtonSend = styled.button`
  position: absolute;
  width: 4rem;
  height: 4rem;
  top: 1.7rem;
  right: 1rem;
  cursor: pointer;
  opacity: ${(props) => props.inputValue ? 1 : 0.3 };
  pointer-events: ${(props) => props.inputValue ? "auto" : "none" };
  fill: ${(props) => props.theme.colors.primary};
  transition: all 0.2s;
  
  &:hover {
    fill: ${(props) => props.theme.colors.accent};
  }
`;

export default ButtonSend;
