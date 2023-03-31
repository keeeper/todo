import React, {FC} from "react";
import { ReactSVG } from "react-svg";
import ListItem  from "./styles/ListItem.styled";
import ButtonDelete  from "./styles/ButtonDelete.styled";
import Checkbox  from "./styles/Checkbox.styled";
import CheckboxLabel  from "./styles/CheckboxLabel.styled";
import { ITodoItem } from "../types/types";

type Props = {
  data: ITodoItem,
  statusHandler: (id: string) => void,
  deleteHandler: (id: string) => void
}

const TodoItem:FC<Props> = ({data, deleteHandler, statusHandler}) => {
  return (
    <ListItem done={data.done}>
      <Checkbox type="checkbox" checked={data.done} onChange={()=>statusHandler(data.id)} />
      <CheckboxLabel>{data.text}</CheckboxLabel>
      <ButtonDelete type="button" onClick={()=>deleteHandler(data.id)}>
        <ReactSVG src="../images/delete.svg" />
      </ButtonDelete>
    </ListItem>  
  )
}

export default TodoItem;