document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-btn");
  const todoInput = document.getElementById("new-todo");
  const todoList = document.getElementById("todo-list");

  addButton.addEventListener("click", function () {
    const taskText = todoInput.value.trim();
    if (taskText) {
      addTodoItem(taskText);
      todoInput.value = "";
      saveTodos();
    }
  });

  todoList.addEventListener("click", function (event) {
    if (event.target.className === "delete-btn") {
      const li = event.target.parentNode.parentNode;
      li.parentNode.removeChild(li);
      saveTodos();
    } else if (event.target.className === "complete-btn") {
      const li = event.target.parentNode.parentNode;
      li.classList.toggle("completed");
      saveTodos();
    }
  });

  function addTodoItem(text) {
    const li = document.createElement("li");
    li.innerHTML = `
            <span class="todo-text">${text}</span>
            <div class="actions">
                <button class="complete-btn">Complete</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
    todoList.appendChild(li);
  }

  function saveTodos() {
    const todos = [];
    document.querySelectorAll("#todo-list li").forEach((item) => {
      todos.push({
        text: item.querySelector(".todo-text").textContent,
        completed: item.classList.contains("completed"),
      });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) {
      todos.forEach((todo) => {
        addTodoItem(todo.text);
        if (todo.completed) {
          const lastItem = todoList.lastChild;
          lastItem.classList.add("completed");
        }
      });
    }
  }

  loadTodos();
});
