import React from 'react';
import AddIcon from '../icons/AddTodoIcon';

import { Todo } from './types';

import { AddTodoFormStyled, AddTodoInputStyled, AddTodoButtonStyled } from './styles';

interface TodoHeaderState {
  title: string;
}

interface TodoHeaderProps {
  onSubmit(todo: Todo): void;
}

export default class TodoHeader extends React.Component<TodoHeaderProps, TodoHeaderState> {
  public state: TodoHeaderState = {
    title: '',
  };

  /** Changing the state on every key stroke */
  public handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
    });
  };

  /** Pass the new todo to the parent component  */
  public handleSubmit = (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (this.state.title) {
      this.props.onSubmit({
        id: String(Date.now()),
        title: this.state.title,
        completed: false,
      });
      this.setState({
        title: '',
      });
    }
  };

  public render() {
    return (
      <AddTodoFormStyled onSubmit={this.handleSubmit}>
        <AddTodoInputStyled
          aria-label="Add todo"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          placeholder="Add todo..."
        />
        <AddTodoButtonStyled
          type="submit"
          name="addTodo"
          value="Add ToDo"
          onClick={this.handleSubmit}
        >
          <AddIcon />
        </AddTodoButtonStyled>
      </AddTodoFormStyled>
    );
  }
}
