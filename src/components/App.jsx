import React, {useState, useEffect, useRef} from "react";
import { ReactSVG } from "react-svg";
import { ThemeProvider } from 'styled-components';
import shortid from "shortid";
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import GlobalStyles from "./styles/GlobalStyles";
import MainSection from "./styles/MainSection.styled";
import AppTitle from "./styles/AppTitle.styled";
import ButtonThemeSwitch from "./styles/ButtonThemeSwitch.styled";


const App = () => {
  const [todoList, updateTodoList] = useState([]);
  const [inputValue, updateFormValue] = useState('');
  const [lightTheme, updateTheme] = useState(true);
  const componentDidUpdate = useRef(false);
  
  useEffect(()=> {
    if (componentDidUpdate.current) {
      saveTodoList(todoList);
    } else {
      if (loadTodoList() != null) {
        const todosFromLocalStorage = loadTodoList();
        const finishedTodos = getFinishedTodos(todosFromLocalStorage);
        const unFinishedTodos = getUnFinishedTodos(todosFromLocalStorage);
        updateTodoList([...unFinishedTodos, ...finishedTodos]);
      }
      componentDidUpdate.current = true;
    }
  }, [todoList]);

  const saveTodoList = (todos) => {
    return localStorage.setItem("Todos", JSON.stringify(todos));
  }

  const loadTodoList = () => {
    return JSON.parse(localStorage.getItem("Todos"));
  }
  
  const getFinishedTodos = (todos) => {
    return todos.filter(item => item.done);
  }
  
  const getUnFinishedTodos = (todos) => {
    return todos.filter(item => !item.done);
  }

  const formInputHandler = (e) => {
    e.preventDefault();
    updateFormValue(e.target.value);
  }

  const formSubmitHadler = (e) => {
    e.preventDefault();
    if (inputValue) {
      const finishedTodos = getFinishedTodos(todoList);
      const unFinishedTodos = getUnFinishedTodos(todoList);
      updateTodoList([{id: shortid.generate(), text: inputValue, done: false}, ...unFinishedTodos, ...finishedTodos]);
      updateFormValue('');
    }
  }

  const todoItemStatusHandler = (id) => {
    const todoListShallowCopy = [...todoList];
    todoListShallowCopy.map((item) => {
      if (item.id === id) { 
        !item.done ? item.done = true : item.done = false 
      }
    });

    const finishedTodos = getFinishedTodos(todoList);
    const unFinishedTodos = getUnFinishedTodos(todoList);
    updateTodoList([...unFinishedTodos, ...finishedTodos]);
  }

  const todoItemDeleteHandler = (id) => {
    updateTodoList(todoList.filter(item => item.id !== id));
  }

  const switchTheme = () => {
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
      <TodoForm onSubmitHandler={formSubmitHadler} onInputHandler={formInputHandler} inputValue={inputValue} />
      <ul>
        {todoList.map((item) => <TodoItem data={item} statusHandler={todoItemStatusHandler} deleteHandler={todoItemDeleteHandler} key={item.id} />)}
      </ul>
    </MainSection>
    <ButtonThemeSwitch type="button" onClick={()=>switchTheme()}>
      <ReactSVG src={`${lightTheme ? "../images/dark_mode.svg" : "../images/light_mode.svg" }`} />
    </ButtonThemeSwitch>
  </ThemeProvider>
  )
}

export default App;