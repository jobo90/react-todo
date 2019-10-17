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

  /** Fetching todos from API */
  public async componentDidMount() {
    // Setting isLoading to true which disables the Complete, Edit and Delete buttons in the TodoItem component
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
    // Setting isLoading to true which disables the Complete, Edit and Delete buttons in the TodoItem component
    this.setState({
      isLoading: true,
    });

    // Sending POST request to server to add the todo item
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

      // Throw an error if response is not in range between 200-299
      if (!response.ok) {
        throw Error(response.statusText);
      }

      // Convert the response to json
      const json = await response.json();

      // Add the new todo item to the top of the todos in state and set isLoading to false to enable all buttons again
      this.setState({
        todos: [json, ...this.state.todos],
        isLoading: false,
      });
    } catch (error) {
      throw error;
    }
  };

  public toggleComplete = async (todo: Todo) => {
    // Setting isLoading to true which disables the Complete, Edit and Delete buttons in the TodoItem component
    this.setState({
      isLoading: true,
    });

    // Sending PATCH request to server to change the completed status of the item
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

      // Throw an error if response is not in range between 200-299
      if (!response.ok) {
        throw Error(response.statusText);
      }

      // Convert the response to json
      const json = await response.json();

      // Map over the state and change the items completed state where the id matches, then set isLoading to false to enable all buttons again
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

  public handleDeleteTodo = async (id: string) => {
    // Setting isLoading to true which disables the Complete, Edit and Delete buttons in the TodoItem component
    this.setState({
      isLoading: true,
    });

    // Sending DELETE request to server to remove the selected todo item
    try {
      const response = await fetch(
        `https://my-json-server.typicode.com/jobo90/restapi2/todos/${id}`,
        {
          method: 'DELETE',
        },
      );

      // Throw an error if response is not in range between 200-299
      if (!response.ok) {
        throw Error(response.statusText);
      }

      // Filter the todos in state to remove the selected todo item, then set isLoading to false to enable all buttons again
      this.setState({
        todos: this.state.todos.filter(todo => todo.id !== id),
        isLoading: false,
      });
    } catch (error) {
      throw error;
    }
  };

  public handleEditTodo = async (newTodoText: string, todoId: string) => {
    // Setting isLoading to true which disables the Complete, Edit and Delete buttons in the TodoItem component
    this.setState({
      isLoading: true,
    });

    // Sending PATCH request to server to change the title of the item
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

      // Throw an error if response is not in range between 200-299
      if (!response.ok) {
        throw Error(response.statusText);
      }

      // Map over the state and change the items title where the id matches, then set isLoading to false to enable all buttons again
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

  // Set the state to show the todos by filter (all, active, completed)
  private filterTodos = (filter: string) => {
    this.setState({
      todosToShow: filter,
    });
  };

  // 
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

  // Show the number of todos that are not completed
  private showTodosLeft = () => {
    return this.state.todos.filter(todo => !todo.completed).length;
  };

  public render() {
    // Create an empty array of todos
    let todos: Array<Todo> = [];

    // Fill the empty array with filtered state
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
