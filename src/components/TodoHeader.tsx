import React from 'react';

import { Todo } from './types';

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

  /** Pass the new todo to the parent component */
  public handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    this.props.onSubmit({
      id: Date.now().toString(),
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
        <input
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          placeholder="Add todo..."
        />
        <button onClick={this.handleSubmit}>Add ToDo</button>
      </form>
    );
  }
}
