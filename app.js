const STORAGE_KEY = 'todos';

// БЭМ-классы задачи в одном месте, чтобы JS и SCSS не расходились
const ITEM = {
  block: 'todo-item',
  done: 'todo-item--done',
  checkbox: 'todo-item__checkbox',
  text: 'todo-item__text',
  delete: 'todo-item__delete',
};

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const empty = document.getElementById('todo-empty');
const footer = document.getElementById('todo-footer');
const counter = document.getElementById('todo-counter');
const clearBtn = document.getElementById('todo-clear');

let todos = loadTodos();

// --- Хранилище ---
function loadTodos() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // localStorage недоступен (например, приватный режим) — работаем без сохранения
  }
}

// --- Отрисовка ---
function createItem(todo) {
  const li = document.createElement('li');
  li.className = ITEM.block;
  li.classList.toggle(ITEM.done, todo.done);
  li.dataset.id = todo.id;

  const checkbox = document.createElement('input');
  checkbox.className = ITEM.checkbox;
  checkbox.type = 'checkbox';
  checkbox.checked = todo.done;
  checkbox.setAttribute('aria-label', 'Отметить выполненной');

  const text = document.createElement('span');
  text.className = ITEM.text;
  text.textContent = todo.text; // textContent защищает от вставки HTML

  const del = document.createElement('button');
  del.className = ITEM.delete;
  del.type = 'button';
  del.textContent = '×';
  del.title = 'Удалить';
  del.setAttribute('aria-label', 'Удалить задачу');

  li.append(checkbox, text, del);
  return li;
}

function render() {
  list.replaceChildren(...todos.map(createItem));

  const left = todos.filter((t) => !t.done).length;
  const doneCount = todos.length - left;

  counter.textContent = `Осталось: ${left} из ${todos.length}`;
  empty.hidden = todos.length > 0;
  footer.hidden = todos.length === 0;
  clearBtn.hidden = doneCount === 0;
}

function update() {
  saveTodos();
  render();
}

// --- Действия ---
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  todos.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    text,
    done: false,
  });
  input.value = '';
  input.focus();
  update();
});

list.addEventListener('click', (e) => {
  const li = e.target.closest(`.${ITEM.block}`);
  if (!li) return;
  const todo = todos.find((t) => t.id === li.dataset.id);
  if (!todo) return;

  const cl = e.target.classList;
  if (cl.contains(ITEM.delete)) {
    todos = todos.filter((t) => t.id !== todo.id);
  } else if (cl.contains(ITEM.checkbox) || cl.contains(ITEM.text)) {
    todo.done = !todo.done;
  } else {
    return;
  }
  update();
});

clearBtn.addEventListener('click', () => {
  todos = todos.filter((t) => !t.done);
  update();
});

render();
