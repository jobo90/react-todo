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
  onDelete: (id: string) => void;
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
  min-height: 30px;
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

    let labelClassName;
    let inputClassName;
    let buttonIcon;
    let todoItemClassName;

    if (this.state.editing) {
      labelClassName = 'hidden';
      inputClassName = 'edit';
      buttonIcon = <SaveTodoIcon />;
    } else {
      labelClassName = 'edit';
      inputClassName = 'hidden';
      buttonIcon = <EditTodoIcon />;
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
            <button
              type="button"
              className="completeButton"
              onClick={this.handleComplete}
              disabled={props.isLoading}
            >
              <CompleteTodoIcon />
            </button>
          )}

          <button
            type="button"
            className="editButton"
            onClick={this.handleEdit}
            disabled={props.isLoading}
          >
            {buttonIcon}
          </button>

          <button
            type="button"
            className="deleteButton"
            onClick={this.handleDelete}
            disabled={props.isLoading}
          >
            <DeleteTodoIcon />
          </button>
        </div>
      </TodoItemStyled>
    );
  }
}
