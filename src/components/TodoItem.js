import React, { Component } from 'react';
import classnames from 'classnames';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

class TodoItem extends Component {

  state = {
    editing: false,
    editTitle: this.props.todo.title
  }

  handleChange(event) {
    this.setState({ editTitle: event.target.value });
  }

  handleEdit() {
    this.setState({ editing: true });
  }

  handleKeyDown({ keyCode }) {
    if (keyCode === ESCAPE_KEY) {
      this.handleStop();
    } else if (keyCode === ENTER_KEY) {
      this.handleStop();
    }
  }

  handleStop() {
    this.setState({ editing: false });
    this.handleSubmit();
  }

  handleSubmit() {
    if (this.state.editTitle.trim().length) {
      this.props.onUpdate(this.props.todo.id, this.state.editTitle);
    } else {
      this.props.onRemoveClick(this.props.todo.id);
    }
  }

  render() {
    const { 
      todo, 
      onRemoveClick,
      onToggleClick,
     } = this.props;
    const { editing } = this.state;
    const liClass = classnames({
      completed: todo.completed,
      editing  : editing
    });

    return (
      <li className={liClass}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={todo.completed}
            onChange={() => onToggleClick(todo.id)}
          />
          <label onDoubleClick={this.handleEdit.bind(this)}>{todo.title}</label>
          <button 
            className="destroy" 
            onClick={() => onRemoveClick(todo.id)}
          >
          </button>
        </div>
        <input
          type="text"
          className="edit"
          value={this.state.editTitle}
          onChange={this.handleChange.bind(this)}
          onBlur={this.handleSubmit.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
        />
      </li>
    )
  }
}

export default TodoItem;