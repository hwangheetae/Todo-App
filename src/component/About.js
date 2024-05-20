class About {
  template() {
    return `
    <main>
      <div class="app">
        <header>
          <h1>Todo App</h1>
          <button id="create-btn">새로운 todo 추가하기</button>
        </header>
        <div class="todo-list" id="list"></div>
        <button class="moveToHomePageBtn">시작페이지로..</button>
      </div>
    </main>
      `;
  }

  init() {
    const list = document.getElementById("list");
    const createBtn = document.getElementById("create-btn");
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
      const { itemEl, inputEl, editBtnEl, removeBtnEl } =
        createTodoElement(item);
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
        //data change
        todos = todos.filter((t) => t.id !== item.id);
        //element remove
        itemEl.remove();
        saveToLocalStorage();
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
  }
}
export default new About();
