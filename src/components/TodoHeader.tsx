import React from 'react';

export default class TodoHeader extends React.Component<
  TodoHeaderProps,
  TodoHeaderState
> {
  constructor(props: TodoHeaderProps) {
    super(props);
    this.state = {
      text: ''
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    this.setState({
      text: e.target.value
    });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.props.onSubmit({
      id: Date.now(),
      text: this.state.text,
      completed: false
    });
    this.setState({
      text: ''
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="text"
          value={this.state.text}
          onChange={this.handleChange}
          placeholder="Add todo..."
        />
        <button onClick={this.handleSubmit}>Add ToDo</button>
      </form>
    );
  }
}
