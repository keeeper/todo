import styled from 'styled-components';

const ButtonThemeSwitch = styled.button`
  position: absolute;
  top: 2rem;
  right: 0;
  width: 6rem;
  height: 6rem;
  background-color: ${(props) => props.theme.colors?.light};
  cursor: pointer;
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
`

export default ButtonThemeSwitch;