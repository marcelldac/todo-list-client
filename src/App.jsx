import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";

import { api } from "./api/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  //#region Crud functions
  async function fetchData() {
    try {
      const { data } = await api.get("/tasks");
      setTasks(data.tasks);
    } catch (e) {
      console.log(`Erro ao carregar tasks: ${e}`);
      toast.error("Erro ao carregar tasks!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }

  async function addTask() {
    if (!input)
      return toast.warning("Oops! Uma task não pode ser vazia.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });

    try {
      await api.post("/tasks", {
        name: input,
      });
      fetchData();
    } catch (e) {
      console.log(`Erro ao adicionar task: ${e}`);
      toast.error("Não foi possível adicionar a task!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }

  async function removeTask(todo) {
    const isConfirmed = confirm("Deseja realmente deletar a task?");
    if (!isConfirmed) return;
    try {
      await api.delete(`/tasks/${todo.id}`);
      fetchData();
    } catch (e) {
      console.log(`Erro ao remover task: ${e}`);
      toast.error("Não foi possível remover a task!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }

  async function updateTaskName(task, name) {
    try {
      await api.put(`/tasks/${task.id}`, {
        name,
        isCompleted: false,
      });
      fetchData();
    } catch (e) {
      console.log(`Erro ao atualizar task: ${e}`);
      toast.error("Não foi possível atualizar a task!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
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
              <p
                className="task-name"
                style={{
                  color: task.isCompleted ? "#4A5568" : "#171923",
                }}
              >
                {task.name}
              </p>
              <div>
                <button
                  id="delete-task-button"
                  onClick={() => removeTask(task)}
                  style={{
                    color: task.isCompleted ? "#4A5568" : "#fff",
                    cursor: task.isCompleted ? "inherit" : "pointer",
                  }}
                  disabled={task.isCompleted}
                >
                  <RiDeleteBack2Fill />
                </button>
                <button
                  id="edit-task-button"
                  onClick={() => {
                    const newName = prompt("Para qual nome deseja alterar?");
                    if (!newName) return;
                    updateTaskName(task, newName);
                  }}
                  style={{
                    color: task.isCompleted ? "#4A5568" : "#fff",
                    cursor: task.isCompleted ? "inherit" : "pointer",
                    marginLeft: 10,
                  }}
                  disabled={task.isCompleted}
                >
                  <BiSolidEditAlt />
                </button>
              </div>
              <ToastContainer />
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
