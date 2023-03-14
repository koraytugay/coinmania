import * as todoService from './todoService.js';

const findById = id => document.querySelector(`#${id}`);
const createElement = (name, props = {}) => Object.assign(document.createElement(name), props);

window.addEventListener('load', refreshUi);

findById('new-todo-input').addEventListener('keydown', e => {
  if ('Enter' === e.key && e.target.value) {
    new todoService.Todo(e.target.value);
    e.target.value = '';
    refreshUi();
  }
});

findById('delete-all-todo-items').addEventListener('click', () => {
  todoService.deleteTodoItems();
  refreshUi();
});

function toggleTodoCompleteStatus(id) {
  todoService.toggleTodoItemCompletedStatus(id);
  refreshUi();
}

function deleteTodoItem(id) {
  todoService.deleteTodoItem(id);
  refreshUi();
}

function createTodoDiv({text, id, completed}) {
  const markAsDoneCheckbox = createElement('input', {type: 'checkbox', checked: completed});
  markAsDoneCheckbox.addEventListener('click', () => toggleTodoCompleteStatus(id));

  const todoSpan = createElement('span', {textContent: text});
  if (completed) {
    todoSpan.classList.add('done');
  }

  const deleteTodoItemLink = createElement('a', {href: '#', textContent: '❌'});
  deleteTodoItemLink.addEventListener('click', () => deleteTodoItem(id));

  const todoDiv = createElement('div', {id: id});
  [markAsDoneCheckbox, todoSpan, deleteTodoItemLink].forEach(element => {
    todoDiv.appendChild(element);
  });

  return todoDiv;
}

function refreshUi() {
  const todoItemsDiv = findById('todo-items');
  todoItemsDiv.innerHTML = '';
  todoService.getTodoItems().forEach(todoItem => todoItemsDiv.appendChild(createTodoDiv(todoItem)));
}
