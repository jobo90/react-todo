import React from 'react';
import './App.css';
import { TodoListItem } from './components/TodoListItem';
import TodoHeader from './components/TodoHeader';

// const todos: Array<Todo> = [
//   {
//     id: 1,
//     text: 'Shut up',
//     completed: true
//   },
//   {
//     id: 2,
//     text: 'Learn React',
//     completed: false
//   }
// ];

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

  render() {
    return (
      <div>
        <TodoHeader onSubmit={this.addTodo} />
        {this.state.todos && this.state.todos.map(todo => (
          <div key={todo.id}>{todo.text}</div>
        ))}
        {/* <TodoListItem todo={todos[0]} />
        <TodoListItem todo={todos[1]} /> */}
      </div>
    );
  }
}
