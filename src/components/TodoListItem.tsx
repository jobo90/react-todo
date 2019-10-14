import React from 'react';
import './TodoListItem.css';

interface TodoListItemProps {
  todo: Todo;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ todo }) => {
  return (
    <li>
      <label className={todo.completed ? 'completed' : undefined}>
        <input type="checkbox" checked={todo.completed} />
        {todo.text}
      </label>
    </li>
  );
};
