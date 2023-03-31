import React, {useState, useEffect, useRef, FC, ChangeEvent} from "react";
import { ReactSVG } from "react-svg";
import { ThemeProvider } from 'styled-components';
import shortid from "shortid";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import GlobalStyles from "./styles/GlobalStyles";
import MainSection from "./styles/MainSection.styled";
import AppTitle from "./styles/AppTitle.styled";
import ButtonThemeSwitch from "./styles/ButtonThemeSwitch.styled";
import {ITodoItem} from "../types/types";

const App:FC = () => {
  const [todoList, updateTodoList] = useState<ITodoItem[]>([]);
  const [inputValue, updateFormValue] = useState('');
  const [lightTheme, updateTheme] = useState(true);
  const componentDidUpdate = useRef(false);
  
  useEffect(()=> {
    if (componentDidUpdate.current) {
      saveTodoList(todoList);
    } else {
      if (loadTodoList() != null) {
        const todosFromLocalStorage: ITodoItem[] = loadTodoList();
        const finishedTodos: ITodoItem[] = getFinishedTodos(todosFromLocalStorage);
        const unFinishedTodos: ITodoItem[] = getUnFinishedTodos(todosFromLocalStorage);
        updateTodoList([...unFinishedTodos, ...finishedTodos]);
      }
      componentDidUpdate.current = true;
    }
  }, [todoList]);

  const saveTodoList = (todos: ITodoItem[]):void => {
    return localStorage.setItem("Todos", JSON.stringify(todos));
  }

  const loadTodoList = (): ITodoItem[] => {
    return JSON.parse(localStorage.getItem("Todos"));
  }
  
  const getFinishedTodos = (todos: ITodoItem[]): ITodoItem[] => {
    return todos.filter((item:ITodoItem) => item.done);
  }
  
  const getUnFinishedTodos = (todos: ITodoItem[]): ITodoItem[] => {
    return todos.filter((item:ITodoItem) => !item.done);
  }

  const formInputHandler = (event: ChangeEvent<HTMLInputElement>):void => {
    event.preventDefault();
    updateFormValue(event.target.value);
  }

  const formSubmitHadler = (event: ChangeEvent<HTMLFormElement>):void => {
    event.preventDefault();
    if (inputValue) {
      const finishedTodos: ITodoItem[] = getFinishedTodos(todoList);
      const unFinishedTodos: ITodoItem[] = getUnFinishedTodos(todoList);
      updateTodoList([{id: shortid.generate(), text: inputValue, done: false}, ...unFinishedTodos, ...finishedTodos]);
      updateFormValue('');
    }
  }

  const todoItemStatusHandler = (id: string):void => {
    const todoListShallowCopy: ITodoItem[] = [...todoList];
    todoListShallowCopy.map((item) => {
      if (item.id === id) { 
        !item.done ? item.done = true : item.done = false 
      }
    });

    const finishedTodos: ITodoItem[] = getFinishedTodos(todoList);
    const unFinishedTodos: ITodoItem[] = getUnFinishedTodos(todoList);
    updateTodoList([...unFinishedTodos, ...finishedTodos]);
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