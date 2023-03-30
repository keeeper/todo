import React from "react";
import { ReactSVG } from "react-svg";
import Input from './styles/Input.styled';
import ButtonSend from './styles/ButtonSend.styled';
import Form from './styles/Form.styled';

const TodoForm = ({onInputHandler, onSubmitHandler, inputValue}) => {
  return (
    <Form onSubmit={onSubmitHandler}>
      <Input onChange={onInputHandler} type="text" placeholder="Add text here" value={inputValue} />
      <ButtonSend type="submit" inputValue={inputValue}>
        <ReactSVG src="../images/send.svg"/>
      </ButtonSend>
    </Form>
  )
}

export default TodoForm;