import React from 'react';

export interface TodoContextProps {
  onDelete(id: string): Promise<void>;
  onEdit(newTodoText: string, todoId: string): Promise<void>;
  onToggleComplete(id: string): Promise<void>;
}

export const TodoContext = React.createContext<TodoContextProps>({} as TodoContextProps);