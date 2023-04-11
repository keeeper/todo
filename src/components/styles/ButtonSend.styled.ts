import styled from "styled-components";

const ButtonSend = styled.button`
  position: absolute;
  width: 4rem;
  height: 4rem;
  top: 1.7rem;
  right: 1rem;
  cursor: pointer;
  opacity: ${(props) => props.disabled ? 0.3 : 1 };
  pointer-events: ${(props) => props.disabled ?  "none" : "auto" };
  fill: ${(props) => props.theme.colors?.primary};
  transition: all 0.2s;
  
  &:hover {
    fill: ${(props) => props.theme.colors?.accent};
  }
`;

export default ButtonSend;
