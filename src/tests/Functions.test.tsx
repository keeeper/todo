import Todos from "../logic/Todos";
import { ITodoItem } from "../types/types";

jest.spyOn(Todos, 'getId').mockImplementation(() => '123');

describe("Manage Todos", ()=>{
  let mockTodos: ITodoItem[];

  beforeAll(()=>{
    mockTodos = [
      {id: 'sLdeQhv2Y', text: 'Buy bread', done: true},
      {id: 'fpW_4RSli', text: 'Read book', done: false},
      {id: 'fQlDVJ67Q', text: 'Write tests', done: false},
    ];
  });

  test("Should return 1 finished todo 'Buy bread'", () => {
    const todos: ITodoItem[] = Todos.getFinished(mockTodos);
    expect(todos).toEqual([{id: 'sLdeQhv2Y', text: 'Buy bread', done: true}])
  })

  test("Should return 4 unfinished todos", () => {
    const todos: ITodoItem[] = Todos.getUnFinished(mockTodos);
    expect(todos).toEqual([{id: 'fpW_4RSli', text: 'Read book', done: false},
    {id: 'fQlDVJ67Q', text: 'Write tests', done: false}])
  })

  test("Should return array of 3 todos, 2 finished and 1 unfinished. Unfinished - first", () => {
    const todos: ITodoItem[] = Todos.updateStatus(mockTodos, 'fpW_4RSli');
    const expected = [
      {id: 'fQlDVJ67Q', text: 'Write tests', done: false}, 
      {id: 'sLdeQhv2Y', text: 'Buy bread', done: true},
      {id: 'fpW_4RSli', text: 'Read book', done: true}]
    expect(todos).toEqual(expected);
  })

  test("Add item", () => {
    const todos: ITodoItem[] = Todos.addItem(mockTodos, 'Sleep');
    const expected = [{id: '123', text: 'Sleep', done: false},
    {id: 'fQlDVJ67Q', text: 'Write tests', done: false},
    {id: 'sLdeQhv2Y', text: 'Buy bread', done: true},
    {id: 'fpW_4RSli', text: 'Read book', done: true}]
    expect(todos).toEqual(expected)
  })
})
