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
  todos: Array<Todo>
}