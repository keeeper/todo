import React, {useState, useEffect, useRef, FC, ChangeEvent} from "react";
import { ReactSVG } from "react-svg";
import { ThemeProvider } from 'styled-components';
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import GlobalStyles from "./styles/GlobalStyles";
import MainSection from "./styles/MainSection.styled";
import AppTitle from "./styles/AppTitle.styled";
import ButtonThemeSwitch from "./styles/ButtonThemeSwitch.styled";
import { ITodoItem } from "../types/types";
import Todos from "../logic/Todos";

const App:FC = () => {
  const [todoList, updateTodoList] = useState<ITodoItem[]>([]);
  const [inputValue, updateFormValue] = useState('');
  const [lightTheme, updateTheme] = useState(true);

  useEffect(()=> {
    if (Todos.loadTodoList() != null) {
      const loadedAndFilteredTodos = Todos.loadFromLocalStorageAndFilter()
      updateTodoList(loadedAndFilteredTodos);
    } 
  }, []);

  useEffect(()=>{
    Todos.saveToLocalStorage(todoList);
    console.log(todoList)
  }, [todoList]);

  const formInputHandler = (event: ChangeEvent<HTMLInputElement>):void => {
    event.preventDefault();
    updateFormValue(event.target.value);
  }

  const formSubmitHadler = (event: ChangeEvent<HTMLFormElement>):void => {
    event.preventDefault();
    if (inputValue) {
      const addedAndFilteredTodos: ITodoItem[] = Todos.addItem(todoList, inputValue)
      updateTodoList(addedAndFilteredTodos);
      updateFormValue('');
    }
  }

  const todoItemStatusHandler = (id: string):void => {
    const changedStatusAndFiltered = Todos.updateStatus(todoList, id);
    updateTodoList(changedStatusAndFiltered);
  }

  const todoItemDeleteHandler = (id: string):void => {
    updateTodoList(todoList.filter(item => item.id !== id));
  }

  const switchTheme = ():void => {
    updateTheme(!lightTheme);
  }

  return (
    <ThemeProvider 
      theme={{
        colors: {
          primary: "#00A6FB",
          secondary: "#CFCFCF",
          accent: "#006494",
          text: lightTheme ? "#051923" : "#ffffff",
          background: lightTheme ? "#EFEFEF" : "#051923",
          light: lightTheme ? "white" : "#003554"
        }
      }}
    >
    <GlobalStyles />
    <MainSection>
      <AppTitle>My current goals</AppTitle>
      <TodoForm onSubmitHandler={formSubmitHadler} onInputHandler={formInputHandler} inputValue={inputValue} showButton={!!inputValue} />
      <ul>
        {todoList.map((item: ITodoItem) => <TodoItem data={item} statusHandler={todoItemStatusHandler} deleteHandler={todoItemDeleteHandler} key={item.id} />)}
      </ul>
    </MainSection>
    <ButtonThemeSwitch type="button" onClick={()=>switchTheme()}>
      <ReactSVG src={`${lightTheme ? "../images/dark_mode.svg" : "../images/light_mode.svg" }`} />
    </ButtonThemeSwitch>
  </ThemeProvider>

  )
}

export default App;