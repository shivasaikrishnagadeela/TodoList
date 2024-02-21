import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios.get('http://localhost:3334/get')
      .then(result => setTodos(result.data))
      .catch(err => setError(err.message));
  };

  const handleAdd = () => {
    axios.post('http://localhost:3334/todos', { todo: newTodo })
      .then(response => {
        console.log('added successfully:', response.data);
        fetchTodos();
        setNewTodo('');
      })
      .catch(error => {
        setError(error.message);
        console.error('Error adding todo:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3334/delete/`+id)
      .then(response => {
        console.log('deleted successfully:', response.data);
        fetchTodos();
      })
      .catch(error => {
        setError(error.message);
        console.error('Error deleting todo:', error);
      });
  };

  return (
    <div>
      <h1 className='heading'>TODO LIST</h1>
      <div className='create-form'>
        <div className='input-container'>
          <input type="text" placeholder='Enter Todos' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
          <button className='AddButton' onClick={handleAdd}>ADD</button>
        </div>
        <div className='todo-list'>
          {todos.length === 0 ? <div className='noRecord'>No Record</div> :
            todos.map((todo, index) => (
              <div className='newLineTodo' key={index}>
                {todo && todo.todo}
                {todo && <button onClick={() => handleDelete(todo._id)}>X</button>}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Todo;
