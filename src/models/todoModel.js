import { v4 } from 'node-uuid';

export default class Todo {

  constructor(title) {
    this.id = v4();
    this.title = title;
    this.completed = false;
  }

}