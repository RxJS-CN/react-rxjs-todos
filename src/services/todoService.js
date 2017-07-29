import 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/map';

import Todo from '../models/todoModel';

const initialTodos = JSON.parse(localStorage.getItem('react-rxjs-todos')) || [];

class TodoService {

  constructor() {

    this.update$               = new BehaviorSubject(todos => todos);
    this.create$               = new Subject();
    this.modify$               = new Subject();
    this.remove$               = new Subject();
    this.removeCompleted$      = new Subject();
    this.toggle$               = new Subject();
    this.toggleAll$            = new Subject();


    this.createTodo$           = new Subject();
    this.modifyTodo$           = new Subject();
    this.removeTodo$           = new Subject();
    this.removeCompletedTodos$ = new Subject();
    this.toggleTodo$           = new Subject();
    this.toggleAllTodos$       = new Subject();


    this.todos$ = this.update$
        .scan((todos, operation) => operation(todos), initialTodos)
        .publishReplay(1)
        .refCount();
    
    this.todos$.forEach(todos => localStorage.setItem('react-rxjs-todos', JSON.stringify(todos)));
  
    this.create$
        .map(todo => todos => todos.concat(todo))
        .subscribe(this.update$);
    
    this.modify$
        .map(({ uuid, newTitle }) => todos => {
          const targetTodo = todos.find(todo => todo.id === uuid);
          targetTodo.title = newTitle;
          return todos;
        })
        .subscribe(this.update$);
    
    this.remove$
        .map(uuid => todos => todos.filter(todo => todo.id !== uuid))
        .subscribe(this.update$);
    
    this.removeCompleted$
        .map(() => todos => todos.filter(todo => !todo.completed))
        .subscribe(this.update$);
    
    this.toggle$
        .map(uuid => todos => {
          const targetTodo = todos.find(todo => todo.id === uuid);
          targetTodo.completed = !targetTodo.completed;
          return todos;
        })
        .subscribe(this.update$);
    
    this.toggleAll$
        .map(completed => todos => {
          todos.forEach(todo => todo.completed = completed);
          return todos;
        })
        .subscribe(this.update$);

    this.createTodo$
        .subscribe(this.create$);
    
    this.modifyTodo$
        .subscribe(this.modify$);
    
    this.removeTodo$
        .subscribe(this.remove$);

    this.removeCompletedTodos$
        .subscribe(this.removeCompleted$);
    
    this.toggleTodo$
        .subscribe(this.toggle$);
    
    this.toggleAllTodos$
        .subscribe(this.toggleAll$);

  }

  add(title) {
    this.createTodo$.next(new Todo(title));
  }

  remove(uuid) {
    this.removeTodo$.next(uuid);
  }

  removeCompleted() {
    this.removeCompletedTodos$.next();
  }

  toggle(uuid) {
    this.toggleTodo$.next(uuid);
  }

  toggleAll(completed) {
    this.toggleAllTodos$.next(completed);
  }

  update(uuid, newTitle) {
    this.modifyTodo$.next({ uuid, newTitle });
  }

}

export default new TodoService();