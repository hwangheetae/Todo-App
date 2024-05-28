import { create } from "zustand";

interface Todo {
  id: number;
  title: string;
  complete: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  clearTodos: () => void;
  editTodo: (id: number, newTitle: string) => void;
}

const useTodoStore = create<TodoStore>((set) => ({
  todos: JSON.parse(localStorage.getItem("todoData") || "[]"),

  addTodo: (title) =>
    set((state) => {
      const newTodo = { id: Date.now(), title, complete: false };
      const updatedTodos = [...state.todos, newTodo];
      localStorage.setItem("todoData", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    }),

  removeTodo: (id) =>
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => todo.id !== id);
      localStorage.setItem("todoData", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    }),

  toggleTodo: (id) =>
    set((state) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      );
      localStorage.setItem("todoData", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    }),

  clearTodos: () =>
    set(() => {
      localStorage.setItem("todoData", JSON.stringify([]));
      return { todos: [] };
    }),
  editTodo: (id, newTitle) =>
    set((state) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      );
      localStorage.setItem("todoData", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    }),
}));

export default useTodoStore;
