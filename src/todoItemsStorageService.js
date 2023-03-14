const todoItems = 'todo-items';
const idCounter = 'id-counter';

function getTodoItems() {
  if (localStorage.getItem(todoItems) === null) {
    localStorage.setItem(todoItems, JSON.stringify([]));
    localStorage.setItem(idCounter, '1');
  }
  return JSON.parse(localStorage.getItem(todoItems));
}

function getNextTodoItemId() {
  const nextTodoItemId = parseInt(localStorage.getItem(idCounter));
  localStorage.setItem(idCounter, '' + (nextTodoItemId + 1));
  return nextTodoItemId;
}

function setTodoItems(items) {
  localStorage.setItem(todoItems, JSON.stringify(items));
}

function deleteTodoItem(id) {
  setTodoItems(getTodoItems().filter(todoItem => todoItem.id !== id));
}

function deleteTodoItems() {
  setTodoItems([]);
}

function addTodoItem(todoItem) {
  setTodoItems([...getTodoItems(), todoItem]);
}

function getTodoItem(id) {
  return getTodoItems().filter(todoItem => todoItem.id === id)[0];
}

function updateTodoItem(todoItem) {
  const allTodoItems = getTodoItems();
  const itemIndex = allTodoItems.findIndex(item => item.id === todoItem.id);
  allTodoItems[itemIndex].text = todoItem.text;
  allTodoItems[itemIndex].id = todoItem.id;
  allTodoItems[itemIndex].completed = todoItem.completed;
  setTodoItems(allTodoItems);
}

// this is not an object, it is exporting a bunch of functions
export {
  getNextTodoItemId,
  addTodoItem,
  getTodoItems,
  getTodoItem,
  updateTodoItem,
  deleteTodoItem,
  deleteTodoItems
}
