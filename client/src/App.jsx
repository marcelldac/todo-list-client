import { useEffect, useState } from 'react'
import './App.css'
import { api } from './api/api';



function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState();

  async function getTodos() {
    const { data } = await api.get('/todos');
    setTodos(data);
  }

  async function addTodo() {
    await api.post('/todos', {
      name: input,
    })
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
        <input onChange={(event) => {
          setInput(event.target.value)
        }} value={input} />
        <button type='submit'>add task</button>
      </form>
      <MapTodos todos={todos} />
    </div>
  )
}

export default App
