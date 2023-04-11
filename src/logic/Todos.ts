import { ITodoItem } from "../types/types";
import shortid from "shortid";

class Todos {
    static getFinished (todos: ITodoItem[]): ITodoItem[] {
        return todos.filter((item:ITodoItem) => item.done);
    }

    static getUnFinished (todos: ITodoItem[]): ITodoItem[] {
        return todos.filter((item:ITodoItem) => !item.done);
    }

    static loadTodoList (): ITodoItem[] {
        return JSON.parse(localStorage.getItem("Todos"));
    }

    static saveToLocalStorage (todos: ITodoItem[]):void {
        return localStorage.setItem("Todos", JSON.stringify(todos));
    }

    static addItem (todos: ITodoItem[], fieldValue: string): ITodoItem[] {
        const finishedTodos: ITodoItem[] = this.getFinished(todos);
        const unFinishedTodos: ITodoItem[] = this.getUnFinished(todos);
        const id: string = Todos.getId();
        return [{id: id, text: fieldValue, done: false}, ...unFinishedTodos, ...finishedTodos];
    }

    static getId () {
        return shortid.generate();
    }

    static loadFromLocalStorageAndFilter () {
        const todosFromLocalStorage: ITodoItem[] = this.loadTodoList();
        const finishedTodos: ITodoItem[] = this.getFinished(todosFromLocalStorage);
        const unFinishedTodos: ITodoItem[] = this.getUnFinished(todosFromLocalStorage);
        return [...unFinishedTodos, ...finishedTodos];
    } 

    static updateStatus(todos: ITodoItem[], id: string) {
        const todoListShallowCopy: ITodoItem[] = [...todos];
        todoListShallowCopy.map((item) => {
        if (item.id === id) { 
                !item.done ? item.done = true : item.done = false
            }
        });
        const finishedTodos: ITodoItem[] = this.getFinished(todoListShallowCopy);
        const unFinishedTodos: ITodoItem[] = this.getUnFinished(todoListShallowCopy);
        return [...unFinishedTodos, ...finishedTodos];
    }
}

export default Todos;