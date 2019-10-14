import React from 'react';
import './App.css';
import { TodoItem } from './components/TodoItem';
import TodoHeader from './components/TodoHeader';

export default class App extends React.Component {
  state = {
    todos: [
      {
        id: 1,
        text: 'Shut up',
        completed: false
      },
      {
        id: 2,
        text: 'Eat',
        completed: false
      },
      {
        id: 3,
        text: 'Learn',
        completed: true
      }
    ],
    todosToShow: 'all'
  };

  addTodo = (todo: Todo): void => {
    this.setState({
      todos: [todo, ...this.state.todos]
    });
  };

  toggleComplete = (id: number): void => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        } else {
          return todo;
        }
      })
    });
  };

  updateTodoToShow = (s: string): void => {
    this.setState({
      todosToShow: s
    });
  };

  handleDeleteTodo = (id: number): void => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  };

  render() {
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
        <ul>
          {todos.map(todo => (
            <TodoItem
              todo={todo}
              toggleComplete={() => this.toggleComplete(todo.id)}
              onDelete={() => this.handleDeleteTodo(todo.id)}
            />
          ))}
        </ul>
        <div>
          Todos left: {this.state.todos.filter(todo => !todo.completed).length}
        </div>
        <div>
          <button onClick={() => this.updateTodoToShow('all')}>All</button>
          <button onClick={() => this.updateTodoToShow('active')}>
            Active
          </button>
          <button onClick={() => this.updateTodoToShow('completed')}>
            Completed
          </button>
        </div>
      </div>
    );
  }
}

// 27:33
