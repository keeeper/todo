
import * as React from 'react';
import { render, screen } from "@testing-library/react";

import TodoForm from "../components/TodoForm";

const defaultProps = {
  onInputHandler () {return},
  onSubmitHandler () {return},
  inputValue: '',
  showButton: false
}
  
describe("TodoForm", () => {
  test("should display a blank todo form, with send button disabled", () => {
    const todo = render(<TodoForm {...defaultProps} />)
    expect(todo).toBeInTheDocument;
  });
});