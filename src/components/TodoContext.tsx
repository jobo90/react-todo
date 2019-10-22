import React from 'react';
import { Todo } from './types';

export interface TodoContextProps {
  onDelete(id: string): Promise<void>;
  onEdit(newTodoText: string, todoId: string): Promise<void>;
  onToggleComplete(todo: Todo): Promise<void>;
}

export const TodoContext = React.createContext<TodoContextProps>({} as TodoContextProps);
