import React from 'react';

import { TodoItem } from './components/TodoItem';
import TodoHeader from './components/TodoHeader';
import { Todo } from './components/types';

import './App.css';

export interface AppProps {}

interface AppState {
  todos: Array<Todo>;
  todosToShow: string;
  isLoading: boolean;
}

export default class App extends React.Component<AppProps, AppState> {
  public state: AppState = {
    todos: [],
    todosToShow: 'all',
    isLoading: false,
  };

  public async componentDidMount() {
    this.setState({
      isLoading: true,
    });

    try {
      const response = await fetch(
        'https://my-json-server.typicode.com/jobo90/restapi2/todos',
      );

      if (!response.ok) {
        throw Error(response.statusText);
      }

      const json = await response.json();

      this.setState({
        todos: [...json, ...this.state.todos],
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  public addTodo = async (todo: Todo) => {
    this.setState({
      isLoading: true,
    });

    try {
      const response: Response = await fetch(
        'https://my-json-server.typicode.com/jobo90/restapi2/todos',
        {
          method: 'POST',
          body: JSON.stringify({
            id: todo.id,
            title: todo.title,
            completed: todo.completed,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      );

      if (!response.ok) {
        throw Error(response.statusText);
      }

      const json = await response.json();

      this.setState({
        todos: [json, ...this.state.todos],
        isLoading: false,
      });
    } catch (error) {
      throw error;
    }
  };

  public toggleComplete = async (todo: Todo) => {
    this.setState({
      isLoading: true,
    });

    try {
      const response = await fetch(
        `https://my-json-server.typicode.com/jobo90/restapi2/todos/${todo.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            completed: !todo.completed,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      );

      if (!response.ok) {
        throw Error(response.statusText);
      }

      const json = await response.json();

      this.setState({
        todos: this.state.todos.map(todoItem => {
          if (todoItem.id === json.id) {
            return {
              ...todoItem,
              completed: !todoItem.completed,
            };
          } else {
            return todoItem;
          }
        }),
        isLoading: false,
      });
    } catch (error) {
      throw error;
    }
  };

  public filterTodos = (filter: string) => {
    this.setState({
      todosToShow: filter,
    });
  };

  public handleDeleteTodo = async (id: string) => {
    this.setState({
      isLoading: true,
    });

    try {
      const response = await fetch(
        `https://my-json-server.typicode.com/jobo90/restapi2/todos/${id}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw Error(response.statusText);
      }

      this.setState({
        todos: this.state.todos.filter(todo => todo.id !== id),
        isLoading: false,
      });
    } catch (error) {
      throw error;
    }
  };

  public handleEditTodo = async (newTodoText: string, todoId: string) => {
    this.setState({
      isLoading: true,
    });

    try {
      const response = await fetch(
        `https://my-json-server.typicode.com/jobo90/restapi2/todos/${todoId}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            title: newTodoText,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      );

      if (!response.ok) {
        throw Error(response.statusText);
      }

      this.setState({
        todos: this.state.todos.map(todoItem => {
          if (todoItem.id === todoId) {
            return {
              ...todoItem,
              title: newTodoText,
            };
          } else {
            return todoItem;
          }
        }),
        isLoading: false,
      });
    } catch (error) {
      throw error;
    }
  };

  private renderTodoItems = (todo: Todo) => {
    return (
      <TodoItem
        todo={todo}
        onToggleComplete={this.toggleComplete}
        onDelete={() => this.handleDeleteTodo(todo.id)}
        onEdit={this.handleEditTodo}
        key={todo.id}
        isLoading={this.state.isLoading}
      />
    );
  };

  private showTodosLeft = () => {
    return this.state.todos.filter(todo => !todo.completed).length;
  };

  public render() {
    let todos: Array<Todo> = [];

    if (this.state.todosToShow === 'all') {
      todos = this.state.todos;
    } else if (this.state.todosToShow === 'active') {
      todos = this.state.todos.filter(todo => !todo.completed);
    } else if (this.state.todosToShow === 'completed') {
      todos = this.state.todos.filter(todo => todo.completed);
    }

    return (
      <div>
        <TodoHeader onSubmit={this.addTodo} />
        {this.state.isLoading ? <p>Loading...</p> : null}
        <ul>{todos.map(this.renderTodoItems)}</ul>
        <div>Todos left: {this.showTodosLeft()}</div>
        <div>
          <button onClick={() => this.filterTodos('all')}>All</button>
          <button onClick={() => this.filterTodos('active')}>Active</button>
          <button onClick={() => this.filterTodos('completed')}>
            Completed
          </button>
        </div>
      </div>
    );
  }
}
