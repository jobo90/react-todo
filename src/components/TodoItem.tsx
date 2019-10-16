import React from 'react';

import { Todo } from './types';

import './TodoItem.css';

export interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

interface TodoItemState {
  todoText: string;
  editing: boolean;
}

export class TodoItem extends React.Component<TodoItemProps, TodoItemState> {
  constructor(props: TodoItemProps) {
    super(props);
    this.state = {
      todoText: props.todo.text,
      editing: false,
    };
  }

  public handleEdit = () => {
    this.setState({
      editing: !this.state.editing,
    });
  };

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todoText: e.target.value,
    });
  };

  public handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let val = this.state.todoText.trim();

    if (e.key === 'Enter' || e.key === 'Escape') {
      if (val) {
        this.setState({
          todoText: val,
          editing: false,
        });
      }
    }
  };

  public setOnEditFalse = () => {
    this.setState({ editing: false });
  };

  public handleComplete = () => {
    this.props.onToggleComplete(this.props.todo.id);
  };

  // handleKeyDown(e) {}

  public render() {
    return (
      <div className="todoItem">
        <li
          id={this.props.todo.id.toString()}
          className={this.props.todo.completed ? 'completed' : undefined}
        >
          <label className={this.state.editing ? 'hidden' : 'edit'}>
            {this.state.todoText}
            {/* {this.props.todo.text} */}
          </label>
          <input
            autoFocus={this.state.editing ? true : false}
            className={this.state.editing ? 'edit' : 'hidden'}
            onBlur={this.setOnEditFalse}
            onChange={e => this.handleChange(e)}
            onKeyDown={e => this.handleSubmit(e)}
            value={this.state.todoText}
          />
        </li>
        {this.state.editing ? null : (
          <button onClick={this.handleComplete}>Complete</button>
        )}
        <button onClick={this.handleEdit}>
          {this.state.editing ? 'Save' : 'Edit'}
        </button>
        <button onClick={this.props.onDelete}>Delete</button>
      </div>
    );
  }
}
