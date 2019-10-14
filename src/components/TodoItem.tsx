import React from 'react';
import './TodoItem.css';

export const TodoItem: React.FC<TodoItemProps> = props => {
  return (
    <li onClick={props.toggleComplete}>
      {props.todo.text}
      {/* <label className={todo.completed ? 'completed' : undefined}>
        <input type="checkbox" checked={todo.completed} />
        {todo.text}
      </label> */}
    </li>
  );
};
