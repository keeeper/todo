import * as React from 'react';
import {FC, ChangeEvent} from "react";
import { ReactSVG } from "react-svg";
import Input from './styles/Input.styled';
import ButtonSend from './styles/ButtonSend.styled';
import Form from './styles/Form.styled';

type Props = {
  onInputHandler: (event: ChangeEvent<HTMLInputElement>) => void,
  onSubmitHandler: (event: ChangeEvent<HTMLFormElement>) => void,
  inputValue: string,
  showButton: boolean
}

const TodoForm: FC<Props> = ({onSubmitHandler, onInputHandler, inputValue, showButton}) => {
  return (
    <Form onSubmit={onSubmitHandler}>
      <Input onChange={onInputHandler} type="text" placeholder="Add text here" value={inputValue} />
      <ButtonSend type="submit" disabled={!showButton}>
        <ReactSVG src="../images/send.svg"/>
      </ButtonSend>
    </Form>
  )
}

export default TodoForm;