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
        completed: true
      }
    ]
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

  render() {
    return (
      <div>
        <TodoHeader onSubmit={this.addTodo} />
        {this.state.todos &&
          this.state.todos.map(todo => (
            <TodoItem
              id={todo.id}
              todo={todo}
              toggleComplete={() => this.toggleComplete(todo.id)}
            />
          ))}
      </div>
    );
  }
}
