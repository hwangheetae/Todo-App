const list = document.getElementById("list");
const createBtn = document.getElementById("create-btn");
let currentDeletingItem = null;
let todos = [];

//create event function
createBtn.addEventListener("click", () => {
  createNewTodo();
});

// create a new todo item and add it to the DOM
function createNewTodo() {
  const item = {
    id: crypto.randomUUID(),
    text: "",
    complete: false,
  };
  todos.unshift(item);

  const { itemEl, inputEl, editBtnEl, removeBtnEl } = createTodoElement(item);

  list.prepend(itemEl);
  inputEl.removeAttribute("disabled");
  inputEl.focus();
  saveToLocalStorage();
}

// create and return DOM elements for a new todo item
function createTodoElement(item) {
  //create Element
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");
  itemEl.setAttribute("data-id", item.id);

  const checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  checkboxEl.checked = item.complete;

  if (item.complete) {
    itemEl.classList.add("complete");
  }

  const inputEl = document.createElement("input");
  inputEl.type = "text";
  inputEl.value = item.text;
  inputEl.setAttribute("disabled", "");
  inputEl.placeholder = "할일을 입력하세요!";
  const actionsEl = document.createElement("div");
  actionsEl.classList.add("actions");

  const editBtnEl = document.createElement("button");
  editBtnEl.classList.add("material-icons");
  editBtnEl.innerText = "edit";

  const removeBtnEl = document.createElement("button");
  removeBtnEl.classList.add("material-icons", "remove-btn");
  removeBtnEl.innerText = "remove_circle";

  //check event function
  checkboxEl.addEventListener("change", () => {
    item.complete = checkboxEl.checked;
    if (item.complete) {
      itemEl.classList.add("complete");
    } else {
      itemEl.classList.remove("complete");
    }

    saveToLocalStorage();
  });

  //input event function
  inputEl.addEventListener("input", () => {
    item.text = inputEl.value;
  });

  //input complete event function =>blur
  inputEl.addEventListener("blur", () => {
    inputEl.setAttribute("disabled", "");
    saveToLocalStorage();
  });

  //input complete event function =>Enter keypress
  inputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      inputEl.setAttribute("disabled", "");
      saveToLocalStorage();
    }
  });

  //edit event function

  editBtnEl.addEventListener("click", () => {
    inputEl.removeAttribute("disabled");
    inputEl.focus();
  });

  //remove event function
  removeBtnEl.addEventListener("click", () => {
    currentDeletingItem = item;
    showToast();
  });

  //
  actionsEl.append(editBtnEl);
  actionsEl.append(removeBtnEl);

  itemEl.append(checkboxEl);
  itemEl.append(inputEl);
  itemEl.append(actionsEl);

  return { itemEl, inputEl, editBtnEl, removeBtnEl };
}

//save current todos to local storage
function saveToLocalStorage() {
  const data = JSON.stringify(todos);

  localStorage.setItem("my_todos", data);
}

//load todos from local storage
function loadFromLocalStorage() {
  const data = localStorage.getItem("my_todos");

  if (data) {
    todos = JSON.parse(data);
  }
}

//Display all todos on initial page load
function displayTodos() {
  loadFromLocalStorage();

  todos.forEach((item) => {
    const { itemEl } = createTodoElement(item);
    list.append(itemEl);
  });
}

//display init page
displayTodos();

const deleteBtn = document.getElementById("delete-btn");
const cancleBtn = document.getElementById("cancle-btn");
const toastMessage = document.getElementById("toast-message");

deleteBtn.addEventListener("click", () => {
  confirmDelete();
});

cancleBtn.addEventListener("click", () => {
  cancleDelete();
});

function showToast() {
  toastMessage.style.opacity = "1";
  toastMessage.style.visibility = "visible";
}

function hideToast() {
  toastMessage.style.opacity = "0";
  toastMessage.style.visibility = "hidden";
}

function cancleDelete() {
  hideToast();
}

function confirmDelete() {
  //data change
  if (!currentDeletingItem) return;

  todos = todos.filter((t) => t.id !== currentDeletingItem.id);
  //element remove

  document.querySelector(`div[data-id="${currentDeletingItem.id}"]`).remove();

  saveToLocalStorage();
  hideToast();
  currentDeletingItem = null;
}
