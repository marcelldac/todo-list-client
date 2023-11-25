import "./App.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect, useState } from "react";

import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { FaRegThumbsDown } from "react-icons/fa6";
import { FaRegThumbsUp } from "react-icons/fa";

import { api } from "./api/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const SwalModal = withReactContent(Swal);

  //#region Crud functions
  async function fetchData() {
    try {
      const { data } = await api.get("/tasks");
      setTasks(data.tasks);
    } catch (e) {
      console.log(`Erro ao carregar tasks: ${e}`);
      SwalModal.fire({
        icon: "error",
        title: "Oops...",
        text: "Erro ao carregar Tasks!",
        footer: "Tente novamente mais tarde.",
      });
    }
  }

  async function addTask() {
    if (!input)
      return SwalModal.fire({
        icon: "error",
        title: "Oops...",
        text: "Uma task não pode estar vazia!",
      });

    if (tasks.some((task) => task.name === input)) {
      return SwalModal.fire({
        icon: "error",
        title: "Oops...",
        text: "Já existe uma task com esse nome!",
      });
    }

    try {
      await api.post("/tasks", {
        name: input,
      });
      fetchData();
    } catch (e) {
      console.log(`Erro ao adicionar task: ${e}`);
      SwalModal.fire({
        icon: "error",
        title: "Oops...",
        text: "Erro ao adicionar task!",
        footer: "Tente novamente mais tarde.",
      });
    }
  }

  async function confirmRemoveTask() {
    const res = await SwalModal.fire({
      title: "Deseja realmente deletar a task?",
      icon: "warning",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: <FaRegThumbsUp />,
      confirmButtonAriaLabel: "Confirmar",
      cancelButtonText: <FaRegThumbsDown />,
      cancelButtonAriaLabel: "Cancelar",
    });
    return res.isConfirmed;
  }

  async function removeTask(todo) {
    const isConfirmed = await confirmRemoveTask();

    if (!isConfirmed) return;

    try {
      await api.delete(`/tasks/${todo.id}`);
      fetchData();
    } catch (e) {
      console.log(`Erro ao remover task: ${e}`);
      SwalModal.fire({
        icon: "error",
        title: "Oops...",
        text: "Não foi possível remover a task!",
        footer: "Tente novamente mais tarde.",
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
      SwalModal.fire({
        icon: "error",
        title: "Oops...",
        text: "Não foi possível atualizar a task!",
        footer: "Tente novamente mais tarde.",
      });
    }
  }

  /* async function updateTaskStatus(task) {
    setIsCompleted(!isCompleted);
    try {
      await api.put(`/tasks/${task.id}`, {
        isCompleted,
      });
      fetchData();
    } catch (e) {
      console.log(`Erro ao atualizar status da task: ${e}`);
      SwalModal.fire({
        icon: "error",
        title: "Oops...",
        text: "Não foi possível atualizar o status da task!",
        footer: "Tente novamente mais tarde.",
      });
    }
  } */

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
              {/* <div
                className="dot-status-todo"
                style={{
                  backgroundColor: task.isCompleted ? "green" : "red",
                }}
                onClick={() => updateTaskStatus(task)}
              ></div> */}
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
