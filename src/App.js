import React, { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  const onInputChange = (e) => {
    setTodo(e.target.value);
  };

  const onAddClick = () => {
    if (todo.trim() !== '') {
      setTodoList([...todoList, { id: uuidv4(), todo: todo, isCompleted: false }]);
      setTodo('');
    }
  };

  const onDeleteClick = (id) => {
    const updatedList = todoList.filter((item) => item.id !== id);
    setTodoList(updatedList);
  };

  const onInputClick = (id) => {
    const updatedList = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setTodoList(updatedList);
  };

  return (
    <div className="app-container">
      <div className="todo-header">
        <h1>My Wishlist</h1>
        <div className="input-container">
          <input
            value={todo}
            onChange={onInputChange}
            placeholder="Add your wishlist here"
            className="todo-input"
          />
          <button onClick={onAddClick} className="add-button">Add</button>
        </div>
      </div>
      <div className="todo-list">
        {todoList.length > 0 &&
          todoList.map((item) => (
            <div key={item.id} className="todo-item">
              <label className="todo-label">
                <input
                  onClick={() => onInputClick(item.id)}
                  type="checkbox"
                  className="todo-checkbox"
                  checked={item.isCompleted}
                  readOnly
                />
                <span className={item.isCompleted ? 'strike-through' : ''}>{item.todo}</span>
              </label>
              <button onClick={() => onDeleteClick(item.id)} className="delete-button">Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
