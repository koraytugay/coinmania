import * as todoItemsStorageService from './todoItemsStorageService.js';

function Todo(text) {
  this.text = text;
  this.id = `todo-item-${todoItemsStorageService.getNextTodoItemId()}`;
  this.completed = false;
  todoItemsStorageService.addTodoItem(this);
}

function toggleTodoItemCompletedStatus(id) {
  const todoItem = todoItemsStorageService.getTodoItem(id);
  todoItem.completed = !todoItem.completed;
  todoItemsStorageService.updateTodoItem(todoItem);
}

const getTodoItems = () => todoItemsStorageService.getTodoItems();
const deleteTodoItem = (id) => todoItemsStorageService.deleteTodoItem(id);
const deleteTodoItems = () => todoItemsStorageService.deleteTodoItems();

export {
  Todo,
  getTodoItems,
  toggleTodoItemCompletedStatus,
  deleteTodoItem,
  deleteTodoItems
}

