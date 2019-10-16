import React from 'react';

import { TodoItem } from './components/TodoItem';
import TodoHeader from './components/TodoHeader';
import { Todo } from './components/types';

import './App.css';

// interface AppState {
//   todos: Array<Todo>;
//   todosToShow: string;
// }

export default class App extends React.Component {
  public state = {
    todos: [
      {
        id: '1',
        text: 'Drink',
        completed: false,
      },
      {
        id: '2',
        text: 'Eat',
        completed: false,
      },
      {
        id: '3',
        text: 'Learn',
        completed: true,
      },
    ],
    todosToShow: 'all',
  };

  public addTodo = (todo: Todo) => {
    this.setState({
      todos: [todo, ...this.state.todos],
    });
  };

  public toggleComplete = (id: string) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return todo;
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
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id),
    });
  };

  private renderTodoItems = (todo: Todo) => {
    return (
      <TodoItem
        todo={todo}
        onToggleComplete={this.toggleComplete}
        onDelete={() => this.handleDeleteTodo(todo.id)}
        key={todo.id}
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
        <ul>{todos.map(this.renderTodoItems)}</ul>
        <div>
          Todos left: {this.showTodosLeft()}
        </div>
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
