import React from 'react';
import styled from 'styled-components';

import { Todo } from './types';
import CompleteTodoIcon from '../icons/CompleteTodoIcon';
import EditTodoIcon from '../icons/EditTodoIcon';
import SaveTodoIcon from '../icons/SaveTodoIcon';
import DeleteTodoIcon from '../icons/DeleteTodoIcon';

export interface TodoItemProps {
  /** Set to true when todos are fetched */
  isLoading: boolean;
  todo: Todo;
  onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onEdit: (val: string, todoId: string) => void;
  onToggleComplete: (todo: Todo) => void;
  className: string;
}

interface TodoItemState {
  todoText: string;
  editing: boolean;
}

interface TodoItemStyledProps {
  completed: boolean;
}

const TodoItemStyled = styled.li<TodoItemStyledProps>`
  align-items: center;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 1px 2px rgba(44, 62, 80, 0.1);
  color: #444;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 15px 0px 15px 15px;
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};

  &.completed {
    background: #dedede;
  }

  .hidden {
    display: none;
  }

  .buttons {
    border-radius: 0px 5px 5px 0px;
    display: none;
    justify-content: flex-end;
    margin-right: 5px;
    top: 0;
    width: 150px;
  }

  .buttons button {
    background: none;
    border: 0px;
    box-shadow: none;
    cursor: pointer;
    float: left;
    fill: #444;
    outline: none;
    width: 50px;
  }

  &:hover .buttons {
    display: flex;
  }

  .completeButton:hover {
    fill: #25b951;
  }

  .editButton:hover {
    fill: #2596b9;
  }

  .deleteButton:hover {
    fill: #cf2620;
  }
`;

/**
 * This component represents a todoitem to render them in the todolist
 * @link: http://
 * @todo: fix foo http://
 */
export class TodoItem extends React.Component<TodoItemProps, TodoItemState> {
  static defaultProps = {
    className: '',
  };

  public state: TodoItemState = {
    todoText: this.props.todo.title,
    editing: false,
  };

  /** Toggling the editing state to show the input / hide the label of the todo and vice versa */
  public handleEdit = () => {
    this.setState({
      editing: !this.state.editing,
    });
  };

  /** Updating the todoText in state on every key stroke which later gets passed to the parent component and updated there as well */
  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todoText: e.target.value,
    });
  };

  /** Check if the key pressed was enter or escape and then call the handleSubmit method */
  public handleKeyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      this.handleSubmit();
    }
  };

  /** Processes the edited todo text and passes it to the parent component */
  public handleSubmit = () => {
    // Remove all spaces before and after the text
    let val: string = this.state.todoText.trim();

    // Checks if the string is longer than 0
    if (val) {
      // Sets the state of TodoItem with the new value
      this.setState({
        todoText: val,
        editing: false,
      });
      // Passes the new value to the parent component
      this.props.onEdit(this.state.todoText, this.props.todo.id);
    }
  };

  /** Gets called when user clicks outside of input */
  public setOnEditFalse = () => {
    this.setState({ editing: false });
    this.handleSubmit();
  };

  /** Calls the parent toggleComplete component */
  public handleComplete = () => {
    this.props.onToggleComplete(this.props.todo);
  };

  public render() {
    let labelClassName;
    let autofocusInput;
    let inputClassName;
    let buttonIcon;
    let todoItemClassName;

    if (this.state.editing) {
      labelClassName = 'hidden';
      autofocusInput = true;
      inputClassName = 'edit';
      buttonIcon = <SaveTodoIcon />;
    } else {
      labelClassName = 'edit';
      autofocusInput = false;
      inputClassName = 'hidden';
      buttonIcon = <EditTodoIcon />;
    }

    if (this.props.todo.completed) {
      todoItemClassName = 'completed';
    } else {
      todoItemClassName = '';
    }

    const classes = todoItemClassName + ' ' + this.props.className;

    return (
      <TodoItemStyled completed={this.props.todo.completed} className={classes}>
        <label className={labelClassName}>{this.props.todo.title}</label>
        <input
          autoFocus={autofocusInput}
          className={inputClassName}
          onBlur={this.setOnEditFalse}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyEvent}
          value={this.state.todoText}
        />
        <div className="buttons">
          {this.state.editing ? (
            ''
          ) : (
            <button
              className="completeButton"
              onClick={this.handleComplete}
              disabled={this.props.isLoading}
            >
              <CompleteTodoIcon />
            </button>
          )}

          <button
            className="editButton"
            onClick={this.handleEdit}
            disabled={this.props.isLoading}
          >
            {buttonIcon}
          </button>

          <button
            className="deleteButton"
            onClick={this.props.onDelete}
            disabled={this.props.isLoading}
          >
            <DeleteTodoIcon />
          </button>
        </div>
      </TodoItemStyled>
    );
  }
}
