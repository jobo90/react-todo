import React from 'react';

import { Todo } from './types';

import './TodoItem.css';

export interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (todo: Todo) => void;
  onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onEdit: (val: string, todoId: string) => void;
  isLoading: boolean;
}

interface TodoItemState {
  todoText: string;
  editing: boolean;
}

export class TodoItem extends React.Component<TodoItemProps, TodoItemState> {
  constructor(props: TodoItemProps) {
    super(props);
    this.state = {
      todoText: props.todo.title,
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

  public handleKeyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      this.handleSubmit();
    }
  };

  public handleSubmit = () => {
    let val: string = this.state.todoText.trim();

    if (val) {
      this.setState({
        todoText: val,
        editing: false,
      });
      this.props.onEdit(this.state.todoText, this.props.todo.id);
    }
  };

  public setOnEditFalse = () => {
    this.setState({ editing: false });
    this.handleSubmit();
  };

  public handleComplete = () => {
    this.props.onToggleComplete(this.props.todo);
  };

  public render() {
    return (
      <div className="todoItem">
        <li
          id={this.props.todo.id.toString()}
          className={this.props.todo.completed ? 'completed' : undefined}
        >
          <label className={this.state.editing ? 'hidden' : 'edit'}>
            {this.props.todo.title}
          </label>
          <input
            autoFocus={this.state.editing ? true : false}
            className={this.state.editing ? 'edit' : 'hidden'}
            onBlur={this.setOnEditFalse}
            onChange={e => this.handleChange(e)}
            onKeyDown={e => this.handleKeyEvent(e)}
            value={this.state.todoText}
          />
        </li>
        {this.state.editing ? null : (
          <button onClick={this.handleComplete} disabled={this.props.isLoading}>
            Complete
          </button>
        )}
        <button onClick={this.handleEdit} disabled={this.props.isLoading}>
          {this.state.editing ? 'Save' : 'Edit'}
        </button>
        <button onClick={this.props.onDelete} disabled={this.props.isLoading}>
          Delete
        </button>
      </div>
    );
  }
}
