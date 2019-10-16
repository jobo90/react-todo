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
  public state = {
    todos: [
      {
        id: '5',
        title: 'Drink',
        completed: false,
      },
      {
        id: '6',
        title: 'Eat',
        completed: false,
      },
      {
        id: '7',
        title: 'Learn',
        completed: true,
      },
    ],
    todosToShow: 'all',
    isLoading: false,
  };

  public componentDidMount() {
    this.setState({
      isLoading: true,
    });

    fetch('https://my-json-server.typicode.com/jobo90/restapi2/todos')
      .then(response => response.json())
      .then(data =>
        this.setState({
          todos: [...data, ...this.state.todos],
          isLoading: false,
        }),
      );
  }

  public addTodo = (todo: Todo) => {
    fetch('https://my-json-server.typicode.com/jobo90/restapi2/todos', {
      method: 'POST',
      body: JSON.stringify({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json =>
        this.setState({
          todos: [json, ...this.state.todos],
        }),
      );
  };

  public toggleComplete = (todo: Todo) => {
    fetch(`https://my-json-server.typicode.com/jobo90/restapi2/todos/${todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        completed: !todo.completed
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => console.log(json));

    this.setState({
      todos: this.state.todos.map(todoItem => {
        if (todoItem.id === todo.id) {
          return {
            ...todoItem,
            completed: !todo.completed,
          };
        } else {
          return todoItem;
        }
      }),
    });
  };

  public filterTodos = (filter: string) => {
    this.setState({
      todosToShow: filter,
    });
  };

  public handleDeleteTodo = (id: string) => {
    fetch(`https://my-json-server.typicode.com/jobo90/restapi2/todos/${id}`, {
      method: 'DELETE',
    }).then(response => console.log(response));

    // this.setState({
    //   todos: this.state.todos.filter(todo => todo.id !== id),
    // });
  };

  private renderTodoItems = (todo: Todo) => {
    return (
      <TodoItem
        todo={todo}
        onToggleComplete={this.toggleComplete}
        onDelete={() => this.handleDeleteTodo(todo.id)}
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
