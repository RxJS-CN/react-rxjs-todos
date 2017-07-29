import React, { Component} from 'react';

import todoService from '../services/todoService';

import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';

class Todos extends Component {
  
  state = {
    todos: []
  }

  componentDidMount() {
    this.todos$ = todoService.todos$
        .subscribe(todos => this.setState({ todos: todos }));
  }

  componentWillUnmount() {
    this.todos$.unsubscribe();
  }

  getVisibleTodos() {
    const { filter } = this.props.match.params;
    const { todos } = this.state;
    
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  handleAdd(title) {
    todoService.add(title);
  }

  handleRemove(uuid) {
    todoService.remove(uuid);
  }

  handleRemoveCompleted() {
    todoService.removeCompleted();
  }

  handleToggle(uuid) {
    todoService.toggle(uuid);
  }

  handleToggleAll(event) {
    todoService.toggleAll(event.target.checked);
  }

  handleUpdate(uuid, newTitle) {
    todoService.update(uuid, newTitle);
  }

  render() {
    const { todos } = this.state;
    let todoList, todoFooter;

    if (todos.length) {
      const remainingCount = todos.filter(todo => !todo.completed).length;
      const hasCompleted = todos.length > remainingCount;

      todoList = (
        <TodoList
          todos={this.getVisibleTodos()}
          onRemoveClick={this.handleRemove.bind(this)}
          onToggleClick={this.handleToggle.bind(this)}
          onToggleAllClick={this.handleToggleAll.bind(this)}
          onUpdate={this.handleUpdate.bind(this)}
        >
        </TodoList>
      );
      todoFooter = (
        <TodoFooter
          remainingCount={remainingCount}
          hasCompleted={hasCompleted}
          onClearCompletedClick={this.handleRemoveCompleted.bind(this)}
        >
        </TodoFooter>
      );
    }

    return (
      <section className="todoapp">
        <TodoHeader onKeyDown={this.handleAdd.bind(this)}></TodoHeader>
        {todoList}
        {todoFooter}
      </section>
    )
  }
}

export default Todos;