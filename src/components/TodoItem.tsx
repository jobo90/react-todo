import React from 'react';
import './TodoItem.css';

export const TodoItem: React.FC<TodoItemProps> = props => {
  return (
    <li
      id={props.todo.id.toString()}
      className={props.todo.completed ? 'completed' : undefined}
      onClick={props.toggleComplete}
    >
      {props.todo.text}
      {/* <label className={todo.completed ? 'completed' : undefined}>
        <input type="checkbox" checked={todo.completed} />
        {todo.text}
      </label> */}
    </li>
  );
};
