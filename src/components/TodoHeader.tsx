import React from 'react';
import styled from 'styled-components';

import { Todo } from './types';

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  color: #135790;
`;

interface TodoHeaderState {
  title: string;
}

interface TodoHeaderProps {
  onSubmit(todo: Todo): void;
}

export default class TodoHeader extends React.Component<
  TodoHeaderProps,
  TodoHeaderState
> {
  constructor(props: TodoHeaderProps) {
    super(props);
    this.state = {
      title: '',
    };
  }

  /** Changing the state on every key stroke */
  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: e.target.value,
    });
  };

  /** Pass the new todo to the parent component  */
  public handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    this.props.onSubmit({
      id: String(Date.now()),
      title: this.state.title,
      completed: false,
    });
    this.setState({
      title: '',
    });
  };

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Title>Test</Title>
        <input
          aria-label="Add todo"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          placeholder="Add todo..."
        />
        <button
          type="submit"
          name="addTodo"
          value="Add ToDo"
          onClick={this.handleSubmit}
        >
          Add ToDo
        </button>
      </form>
    );
  }
}
