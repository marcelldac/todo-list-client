import "./App.css";
import { useEffect, useState } from "react";

import { api } from "./api/api";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  //#region Crud functions
  async function fetchData() {
    try {
      const { data } = await api.get("/todos");
      setTodos(data);
    } catch (e) {
      console.log(`Erro ao carregar tasks: ${e}`);
      alert("Não foi possível carregar as tasks.");
    }
  }

  async function addTodo() {
    if (!input) alert("Não encontrado");
    try {
      await api.post("/todos", {
        name: input,
      });
      fetchData();
    } catch (e) {
      console.log(`Erro ao adicionar task: ${e}`);
      alert("Não foi possível adicionar a task.");
    }
  }

  async function removeTodo(todo) {
    const res = confirm("Deseja realmente excluir?");
    if (!res) return;
    try {
      await api.delete(`/todos/${todo.id}`);
      fetchData();
    } catch (e) {
      console.log(`Erro ao remover task: ${e}`);
      alert("Não foi possível remover a task.");
    }
  }

  async function updateTodo(todo, name) {
    try {
      await api.put("/todos", {
        id: todo.id,
        name,
      });
      fetchData();
    } catch (e) {
      console.log(`Erro ao atualizar task: ${e}`);
      alert("Não foi possível atualizar a task.");
    }
  }

  async function updateTodoStatus(todo) {
    setIsCompleted(!isCompleted);
    try {
      await api.put("/todos", {
        id: todo.id,
        status: isCompleted,
      });
      fetchData();
    } catch (e) {
      console.log(`Erro ao atualizar status da task: ${e}`);
      alert("Não foi possível atualizar o status da task.");
    }
  }
  //#endregion

  function handleSubmit(e) {
    e.preventDefault();
    addTodo();
    setInput("");
  }

  const MapTodos = ({ todos }) => {
    return (
      <>
        {todos.map((todo) => {
          return (
            <div
              key={todo.id}
              className="container-todo"
              style={{ backgroundColor: todo.status ? "#718096" : "#a0aec0" }}
            >
              <div
                className="dot-status-todo"
                style={{ backgroundColor: todo.status ? "green" : "red" }}
                onClick={() => updateTodoStatus(todo)}
              ></div>
              <div className="content-todo">
                <p
                  className="text-todo"
                  style={{
                    color: todo.status ? "#4A5568" : "#171923",
                  }}
                >
                  {todo.name}
                </p>
              </div>
              <button
                className="remove-btn-todo"
                onClick={() => removeTodo(todo)}
                style={{
                  color: todo.status ? "#4A5568" : "#fff",
                  cursor: todo.status ? "inherit" : "pointer",
                }}
                disabled={todo.status}
              >
                Remover
              </button>
              <button
                onClick={() => {
                  const newName = prompt("Para qual nome deseja alterar?");
                  if (!newName) return;
                  updateTodo(todo, newName);
                }}
                style={{
                  color: todo.status ? "#4A5568" : "#fff",
                  cursor: todo.status ? "inherit" : "pointer",
                }}
                disabled={todo.status}
              >
                Editar
              </button>
            </div>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-header-container">
          <input
            onChange={(event) => {
              setInput(event.target.value);
              console.log(input);
            }}
            value={input}
            className="form-input"
          />
          <button type="submit">Add Task</button>
        </div>
      </form>
      <MapTodos todos={todos} />
    </div>
  );
}

export default App;
