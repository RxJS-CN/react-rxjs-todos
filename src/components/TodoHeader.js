import React, { Component } from 'react';


const ENTER_KEY = 13;

class TodoHeader extends Component {

  addTodo(event) {
    if (event.keyCode !== ENTER_KEY) { return ;}

    event.preventDefault();

    const title = event.target.value.trim();
    
    if (title) {
      this.props.onKeyDown(title);
      this.input.value = '';
    }
  }

  render() {
    return (
      <header>
        <h1>todos</h1>
        <input 
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          ref={node => this.input = node}
          onKeyDown={this.addTodo.bind(this)}
        />
      </header>
    )
  }
};

export default TodoHeader;