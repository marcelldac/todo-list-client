import './App.css'
import { useEffect, useState } from 'react'

import { api } from './api/api';



function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState();

  //#region Crud functions
  async function getTodos() {
    const { data } = await api.get('/todos');
    setTodos(data);
  }

  async function addTodo() {
    if (!input) {
      alert('Input não encontrado')
    };
    await api.post('/todos', {
      name: input,
    });
    getTodos();
  }

  async function removeTodo(todo) {
    await api.delete(`/todos/${todo.id}`);
    getTodos();
  }

  async function updateTodo(todo) {
    await api.put(`/todos`, {
      id: todo.id,
      name: input,
    });
    getTodos();
  }
  //#endregion

  function handleSubmit(e) {
    e.preventDefault();
    addTodo();
  }

  const MapTodos = ({ todos }) => {
    return <div>{
      todos.map((todo) => {
        return (
          <div>
            <p>{todo.name}</p>
            <button onClick={() => removeTodo(todo)}>Rem</button>
            <button onClick={() => updateTodo(todo)}>edit</button>
          </div>
        )
      })
    }</div>
  }

  useEffect(() => {
    getTodos();
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            onChange={(event) => {
              setInput(event.target.value)
              console.log(input);
            }}
            value={input}
            style={{ height: '30px', marginBottom: '10px' }}
          />
          <button type='submit'>Add Task</button>
        </div>
      </form>
      <MapTodos todos={todos} />
    </div>
  )
}

export default App
