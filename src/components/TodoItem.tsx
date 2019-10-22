import React from 'react';
// import styled from 'styled-components';

import { Todo } from './types';
import Button from './Button';
import CompleteTodoIcon from '../icons/CompleteTodoIcon';
import EditTodoIcon from '../icons/EditTodoIcon';
import SaveTodoIcon from '../icons/SaveTodoIcon';
import DeleteTodoIcon from '../icons/DeleteTodoIcon';

import { TodoItemStyled } from './styles';

export interface TodoItemProps {
  /** Set to true when todos are fetched */
  isLoading: boolean;
  todo: Todo;
  onDelete: (id: string) => void;
  onEdit: (val: string, todoId: string) => void;
  onToggleComplete: (todo: Todo) => void;
  className: string;
}

interface TodoItemState {
  todoText: string;
  editing: boolean;
}

export interface TodoItemStyledProps {
  completed: boolean;
}

/**
 * This component represents a todoitem to render them in the todolist
 * @link: http://
 * @todo: fix foo http://
 */
export class TodoItem extends React.PureComponent<TodoItemProps, TodoItemState> {
  static defaultProps = {
    className: '',
  };

  private todoInput = React.createRef<HTMLInputElement>();

  public state: TodoItemState = {
    todoText: this.props.todo.title,
    editing: false,
  };

  /** Toggling the editing state to show the input / hide the label of the todo and vice versa */
  public handleEdit = () => {
    const node = this.todoInput.current;

    this.setState(
      {
        editing: !this.state.editing,
      },
      () => {
        node && node.focus();
      },
    );
  };

  /** Updating the todoText in state on every key stroke which later gets passed to the parent
   * component and updated there as well
   */
  public handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todoText: event.target.value,
    });
  };

  /** Check if the key pressed was enter or escape and then call the handleSubmit method */
  public handleKeyEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      this.handleSubmit();
    }
  };

  /** Processes the edited todo text and passes it to the parent component */
  public handleSubmit = () => {
    // Remove all spaces before and after the text
    let todoText: string = this.state.todoText.trim();

    // Checks if the string is longer than 0
    if (todoText) {
      // Sets the state of TodoItem with the new value
      this.setState({
        todoText,
        editing: false,
      });
      // Passes the new value to the parent component
      this.props.onEdit(this.state.todoText, this.props.todo.id);
    }
  };

  /** Gets called when user clicks outside of input */
  public handleOutsideClick = () => {
    this.setState({ editing: false });
    this.handleSubmit();
  };

  /** Calls the parent toggleComplete component */
  public handleComplete = () => {
    this.props.onToggleComplete(this.props.todo);
  };

  public handleDelete = () => {
    this.props.onDelete(this.props.todo.id);
  };

  public render() {
    const { props } = this;

    let labelClassName: string;
    let inputClassName: string;
    let todoItemClassName: string;

    if (this.state.editing) {
      labelClassName = 'hidden';
      inputClassName = 'edit';
    } else {
      labelClassName = 'edit';
      inputClassName = 'hidden';
    }

    if (this.props.todo.completed) {
      todoItemClassName = 'completed';
    } else {
      todoItemClassName = '';
    }

    const classes = todoItemClassName + ' ' + props.className;

    return (
      <TodoItemStyled completed={props.todo.completed} className={classes}>
        <label className={labelClassName}>{props.todo.title}</label>
        <input
          className={inputClassName}
          onBlur={this.handleOutsideClick}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyEvent}
          ref={this.todoInput}
          value={this.state.todoText}
        />
        <div className="buttons">
          {this.state.editing ? (
            ''
          ) : (
            <Button
              className="completeButton"
              onClick={this.handleComplete}
              disabled={props.isLoading}
              icon={CompleteTodoIcon}
            />
          )}

          <Button
            className="editButton"
            onClick={this.handleEdit}
            disabled={props.isLoading}
            icon={this.state.editing ? SaveTodoIcon : EditTodoIcon}
          />

          <Button
            className="deleteButton"
            onClick={this.handleDelete}
            disabled={props.isLoading}
            icon={DeleteTodoIcon}
          />
        </div>
      </TodoItemStyled>
    );
  }
}
