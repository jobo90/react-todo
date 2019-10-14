type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

interface TodoHeaderState {
  text: string;
}

interface TodoHeaderProps {
  onSubmit(todo: Todo): void;
}

interface AppState {
  todos: Array<Todo>;
  todosToShow: string;
}

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  toggleComplete(event: MouseEvent<HTMLLIElement, MouseEvent>): void;
  onDelete(event: MouseEvent<HTMLLIElement, MouseEvent>): void;
}
