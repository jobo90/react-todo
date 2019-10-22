import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

import { TodoItemStyledProps } from './TodoItem';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Titillium+Web:400,600,700&display=swap');
  
  body {
    background: #ececec;
    display: flex;
    flex-wrap: wrap;
    font-family: 'Titillium Web', sans-serif;
    justify-content: center;
    margin-top: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

export const TodoContainer = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: space-between;
  max-width: 600px;
  width: 500px;

  > ul {
    margin: 10px 0 0 0;
    padding: 0;
    width: 100%;
  }

  > .filterButtons button {
    background: #1c7691;
    border: 0px;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    float: left;
    fill: #444;
    opacity: 0.5;
    outline: none;
    padding: 10px;
    margin: 5px;
  }

  > .filterButtons button:hover {
    background: #1c7691;
    color: #fff;
    opacity: 1;
  }

  > .filterButtons .activeButton:hover {
    color: #9ad4e6;
  }

  > .filterButtons .activeButton {
    background: #1c7691;
    color: #fff;
    opacity: 1;
  }

  > .todosLeft {
    margin: 20px 0;
  }

  > .errorMessage {
    color: #d42626;
  }

  @media (max-width: 570px) {
    > ul {
      width: 90%;
    }
  }
`;

export const TodoItemStyled = styled.li<TodoItemStyledProps>`
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

export const AddTodoFormStyled = styled.form`
  align-items: center;
  background: #2596b9;
  border-radius: 0px 0px 5px 5px;
  box-shadow: 0px 2px 4px rgba(50, 63, 77, 0.15);
  display: flex;
  justify-content: center;
  padding: 18px;
  width: 100%;

  @media (max-width: 570px) {
    width: 90%;
  }
`;

export const AddTodoInputStyled = styled.input`
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

export const AddTodoButtonStyled = styled.button`
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
