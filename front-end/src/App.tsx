import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ToDO {
  _id: string;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<ToDO[]>([]);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:5000/todos').then((response) => {
      setTodos(response.data);
    });
  }, []);

  const addTodo = () => {
    axios.post('http://localhost:5000/todos', { text }).then((response) => {
      setTodos([...todos, response.data]);
      setText('');
    });
  };

  const deleteTodo = (id: string) => {
    axios.delete(`http://localhost:5000/todos/${id}`).then(() => {
      setTodos(todos.filter((todo) => todo._id !== id));
    });
  };

  const toggleTodo = (id: string) => {
    axios.put(`http://localhost:5000/todos/${id}`).then((response) => {
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    });
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : '' }}
              onClick={() => toggleTodo(todo._id)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default App;
