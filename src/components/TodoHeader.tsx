import React from 'react';
import styled from 'styled-components';
import AddIcon from '../icons/AddTodoIcon';

import { Todo } from './types';

const AddTodoFormStyled = styled.form`
  align-items: center;
  background: #2596b9;
  border-radius: 0px 0px 5px 5px;
  box-shadow: 0px 2px 4px rgba(50, 63, 77, 0.15);
  display: flex;
  justify-content: center;
  padding: 18px;
  width: 100%;
`;

const AddTodoInputStyled = styled.input`
  background: #3eb3d6;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 0px;
  border-top-left-radius: 5px;
  border-top-right-radius: 0px;
  border: 0px;
  box-shadow: none;
  font-size: 15px;
  height: 45px;
  outline: none;
  padding: 0 15px 0 0;
  text-indent: 18px;
  width: 90%;
  ::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const AddTodoButtonStyled = styled.button`
  align-items: center;
  background: #3eb3d6;
  border-bottom-right-radius: 5px;
  border-left: 1px solid #2f9ec0;
  border-top-right-radius: 5px;
  border: 0px;
  box-shadow: none;
  cursor: pointer;
  display: flex;
  height: 45px;
  justify-content: center;
  outline: none;
  width: 45px;  

  svg {
    fill: white;
  }

  &:hover svg {
    fill: #333;
  }
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
