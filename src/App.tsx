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
    todoToShow: 'all'
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
      todoToShow: s
    });
  };

  render() {
    let todos = [];

    if (this.state.todoToShow === 'all') {
      todos = this.state.todos;
    } else if (this.state.todoToShow === 'active') {
      todos = this.state.todos.filter(todo => !todo.completed);
    } else if (this.state.todoToShow === 'completed') {
      todos = this.state.todos.filter(todo => todo.completed);
    }

    return (
      <div>
        <TodoHeader onSubmit={this.addTodo} />
        <ul>
          {this.state.todos &&
            this.state.todos.map(todo => (
              <TodoItem
                todo={todo}
                toggleComplete={() => this.toggleComplete(todo.id)}
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
