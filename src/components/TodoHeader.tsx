import React from 'react';

import { Todo } from './types';

interface TodoHeaderState {
  text: string;
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
      text: '',
    };
  }

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      text: e.target.value,
    });
  };

  public handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    this.props.onSubmit({
      id: Date.now().toString(),
      text: this.state.text,
      completed: false,
    });
    this.setState({
      text: '',
    });
  };

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="text"
          value={this.state.text}
          onChange={this.handleChange}
          placeholder="Add todo..."
        />
        <button onClick={this.handleSubmit}>Add ToDo</button>
      </form>
    );
  }
}
