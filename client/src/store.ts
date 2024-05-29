import { create } from "zustand";
import axios from "axios";
// todo interface 정의
interface Todo {
  id: number;
  title: string;
  complete: boolean;
}
// Zustand store 인터페이스 정의
interface TodoStore {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  clearTodos: () => void;
  editTodo: (id: number, newTitle: string) => void;
  fetchTodos: () => void;
}
// zustand store 생성
const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  //백엔드에서 TODOS를 가져오는 함수

  //get 요청을 보내 todo 가져오기
  fetchTodos: async () => {
    const response = await axios.get("/api/todos");
    //response.data: 응답 데이터에서 Todo 항목들을 추출
    // Zustand의 set 함수를 사용하여 todos 상태를 업데이트합니다.
    set({ todos: response.data });
  },
  // 백엔드에 새로운 todos를 추가하는 함수
  addTodo: async (title) => {
    const response = await axios.post("/api/todos", { title, complete: false });
    set((state) => ({
      todos: [...state.todos, response.data],
    }));
  },
  // 백엔드에서 Todo를 삭제하는 함수

  removeTodo: async (id) => {
    await axios.delete(`/api/todos/${id}`);
    set((state) => ({
      //상태에서 삭제된 Todo 항목을 제외한 나머지 항목들로 상태를 업데이트합니다.
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },
  // Todo의 완료 상태를 토글하는 함수

  toggleTodo: async (id) => {
    set((state) => {
      //특정 id를 가진 todo 항목 찾기
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        //찾은 Todo 항목의 complete 속성을 토글합니다.
        const updatedTodo = { ...todo, complete: !todo.complete };
        //엔드포인트로 PUT 요청을 보내서 Todo 항목을 업데이트합니다.
        axios.put(`/api/todos/${id}`, updatedTodo);
        return {
          todos: state.todos.map((t) => (t.id === id ? updatedTodo : t)),
        };
      }
      return state;
    });
  },
  // 모든 Todos를 삭제하는 함수

  clearTodos: async () => {
    // Note: This implementation assumes an API endpoint exists to clear all todos
    await axios.delete("/api/todos");
    set({ todos: [] });
  },
  // Todo의 제목을 수정하는 함수

  editTodo: async (id: number, newTitle: string) => {
    set((state) => {
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        const updatedTodo = { ...todo, title: newTitle };
        //엔드포인트로 PUT 요청을 보내서 Todo 항목을 업데이트합니다.
        axios.put(`/api/todos/${id}`, updatedTodo);
        return {
          todos: state.todos.map((t) => (t.id === id ? updatedTodo : t)),
        };
      }
      return state;
    });
  },
}));

export default useTodoStore;
