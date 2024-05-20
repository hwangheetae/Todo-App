document.addEventListener("DOMContentLoaded", function () {
  const createBtn = document.getElementById("create-btn");
  const list = document.getElementById("list");

  createBtn.addEventListener("click", function () {
    const todoText = prompt("할 일을 입력하세요:");
    if (todoText) {
      addTodoItem(todoText);
      saveToLocalStorage();
    }
  });

  list.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-btn")) {
      const itemEl = event.target.closest(".item");
      itemEl.remove();
      saveToLocalStorage();
    } else if (event.target.classList.contains("edit")) {
      const itemEl = event.target.closest(".item");
      const inputEl = itemEl.querySelector('input[type="text"]');
      inputEl.removeAttribute("disabled");
      inputEl.focus();
      inputEl.addEventListener("blur", function () {
        inputEl.setAttribute("disabled", "");
        saveToLocalStorage();
      });
    } else if (event.target.classList.contains("checkbox")) {
      const itemEl = event.target.closest(".item");
      const checkbox = event.target;
      itemEl.classList.toggle("complete", checkbox.checked);
      saveToLocalStorage();
    }
  });

  function addTodoItem(text, complete = false) {
    const itemEl = document.createElement("div");
    itemEl.classList.add("item");
    if (complete) {
      itemEl.classList.add("complete");
    }
    itemEl.innerHTML = `
      <input type="checkbox" class="checkbox" ${complete ? "checked" : ""}>
      <input type="text" value="${text}" disabled>
      <div class="actions">
        <button class="material-icons edit">edit</button>
        <button class="material-icons remove-btn">remove_circle</button>
      </div>
    `;
    list.appendChild(itemEl);
  }

  function saveToLocalStorage() {
    const todos = [];
    document.querySelectorAll(".item").forEach((item) => {
      const text = item.querySelector('input[type="text"]').value;
      const complete = item.classList.contains("complete");
      todos.push({ text, complete });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function loadFromLocalStorage() {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) {
      todos.forEach((todo) => {
        addTodoItem(todo.text, todo.complete);
      });
    }
  }

  loadFromLocalStorage();
});
