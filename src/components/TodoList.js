import React from 'react';

import TodoItem from './TodoItem';

const TodoList = (props) => (
  <section className="main">
    <input type="checkbox" className="toggle-all" onChange={props.onToggleAllClick} />
    <ul className="todo-list">
      {props.todos.map(todo => 
        <TodoItem
          key={todo.id}
          todo={todo}
          {...props}
        >
        </TodoItem>
      )}
    </ul>
  </section>
)

export default TodoList;