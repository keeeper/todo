import styled from "styled-components";

const Checkbox = styled.input`
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border: 0.25rem solid ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  background-color: transparent;
  transform: translateY(-0.075em);
  -webkit-appearance: none;
  appearance: none;
  background-color: ${(props) => props.theme.colors.light};
  margin: 0;
  cursor: pointer;

  &::before {
    content: "";
    width: 2rem;
    height: 1.7rem;
    background-image: url("../images/done.svg");
    background-repeat: no-repeat;
    background-position: center center;
    transform-origin: center;
    transform: scale(0);
    transition: transform 0.2s;
  }

  &:checked {
    background-color: ${(props) => props.theme.colors.primary};
  }

  &:checked::before {
    transform: scale(1);
  }
`;

export default Checkbox;