import "./App.css";
import { useEffect, useState } from "react";

import { api } from "./api/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  //#region Crud functions
  async function fetchData() {
    try {
      const { data } = await api.get("/tasks");
      setTasks(data);
    } catch (e) {
      console.log(`Erro ao carregar tasks: ${e}`);
      alert("Não foi possível carregar as tasks.");
    }
  }

  async function addTask() {
    if (!input) alert("Não encontrado");
    try {
      await api.post("/tasks", {
        name: input,
      });
      fetchData();
    } catch (e) {
      console.log(`Erro ao adicionar task: ${e}`);
      alert("Não foi possível adicionar a task.");
    }
  }

  async function removeTask(todo) {
    const res = confirm("Deseja realmente excluir?");
    if (!res) return;
    try {
      await api.delete(`/tasks/${todo.id}`);
      fetchData();
    } catch (e) {
      console.log(`Erro ao remover task: ${e}`);
      alert("Não foi possível remover a task.");
    }
  }

  async function updateTaskName(task, name) {
    try {
      await api.put(`/tasks/${task.id}`, {
        name,
      });
      fetchData();
    } catch (e) {
      console.log(`Erro ao atualizar task: ${e}`);
      alert("Não foi possível atualizar a task.");
    }
  }

  async function updateTaskStatus(task) {
    setIsCompleted(!isCompleted);
    try {
      await api.put(`/tasks/${task.id}`, {
        isCompleted,
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
    addTask();
    setInput("");
  }

  const Tasks = ({ tasks }) => {
    return (
      <>
        {tasks.map((task) => {
          return (
            <div
              key={task.id}
              className="container-todo"
              style={{
                backgroundColor: task.isCompleted ? "#718096" : "#a0aec0",
              }}
            >
              <div
                className="dot-status-todo"
                style={{ backgroundColor: task.isCompleted ? "green" : "red" }}
                onClick={() => updateTaskStatus(task)}
              ></div>
              <div className="content-todo">
                <p
                  className="text-todo"
                  style={{
                    color: task.isCompleted ? "#4A5568" : "#171923",
                  }}
                >
                  {task.name}
                </p>
              </div>
              <button
                className="remove-btn-todo"
                onClick={() => removeTask(task)}
                style={{
                  color: task.isCompleted ? "#4A5568" : "#fff",
                  cursor: task.isCompleted ? "inherit" : "pointer",
                }}
                disabled={task.isCompleted}
              >
                Remover
              </button>
              <button
                onClick={() => {
                  const newName = prompt("Para qual nome deseja alterar?");
                  if (!newName) return;
                  updateTaskName(task, newName);
                }}
                style={{
                  color: task.isCompleted ? "#4A5568" : "#fff",
                  cursor: task.isCompleted ? "inherit" : "pointer",
                }}
                disabled={task.isCompleted}
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
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
            className="form-input"
          />
          <button type="submit">Add Task</button>
        </div>
      </form>
      <Tasks tasks={tasks} />
    </div>
  );
}

export default App;
