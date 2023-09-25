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
      alert('Não encontrado')
    };
    await api.post('/todos', {
      name: input,
    });
    getTodos();
  }

  async function removeTodo(todo) {
    const res = confirm('Deseja realmente excluir?')
    if (!res) {
      return
    }
    await api.delete(`/todos/${todo.id}`);
    getTodos();
  }

  async function updateTodo(todo) {
    /* TODO: Improve this */
    const res = prompt('Para qual nome deseja alterar?');
    await api.put(`/todos`, {
      id: todo.id,
      name: res,
    });
    getTodos();
  }
  //#endregion

  function handleSubmit(e) {
    e.preventDefault();
    addTodo();
    setInput('');
  }

  const MapTodos = ({ todos }) => {
    return (
      <>
        {
          todos.map((todo) => {
            return (
              <div className='container-todo'>
                <div className='content-todo'>
                  <p className='text-todo'>{todo.name}</p>
                </div>
                <button className='remove-btn-todo' onClick={() => removeTodo(todo)}>Remover</button>
                <button onClick={() => updateTodo(todo)}>Editar</button>
              </div>
            )
          })
        }
      </>
    );
  };

  useEffect(() => {
    getTodos();
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-header-container'>
          <input
            onChange={(event) => {
              setInput(event.target.value)
              console.log(input);
            }}
            value={input}
            className='form-input'
          />
          <button type='submit'>Add Task</button>
        </div>
      </form>
      <MapTodos todos={todos} />
    </div >
  )
}

export default App
