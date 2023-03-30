import styled from "styled-components";

const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.light};
  border: 1px solid transparent;
  padding: 1.9rem 2rem;
  width: 100%;
  opacity: ${(props) => props.done ? 0.7 : 1};
  transition: opacity 0.2s;
`;

export default ListItem;