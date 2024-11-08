import React, { useState, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { IoMdDoneAll } from "react-icons/io";
import "./TodoApp.css";

const TodoApp = (props) => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };

  const addTodo = () => {
    if (todo.trim() === "") return;

    const isDuplicate = todos.some(
      (to) => to.list.toLowerCase() === todo.toLowerCase()
    );
    if (isDuplicate) {
      alert("This todo item already exists.");
      return;
    }

    if (editId) {
      const updatedTodos = todos.map((to) =>
        to.id === editId ? { ...to, list: todo } : to
      );
      setTodos(updatedTodos);
      setEditId(0);
    } else {
      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
    }
    setTodo("");
  };

  const onDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id));
  };

  const onComplete = (id) => {
    const updatedTodos = todos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodos(updatedTodos);
  };

  const onEdit = (id) => {
    const editTodo = todos.find((to) => to.id === id);
    setEditId(editTodo.id);
    setTodo(editTodo.list);
  };

  return (
    <div className="container">
      <h2 className="h2">Todo App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter Your Todo"
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        />
        <button type="submit" className="button">
          {editId ? "EDIT" : "ADD"}
        </button>
      </form>
      <div className="list">
        <ul>
          {todos.map((to) => (
            <li
              className={`list-items ${to.status ? "completed" : ""}`}
              key={to.id}
            >
              {to.list}
              <span>
                {/* Only show buttons if todo is not completed */}
                {!to.status && (
                  <>
                    <MdDelete
                      className="list-item-list"
                      id="delete"
                      title="Delete"
                      onClick={() => onDelete(to.id)}
                    />
                    <TiEdit
                      className="list-item-list"
                      id="edit"
                      title="Edit"
                      onClick={() => onEdit(to.id)}
                    />
                  </>
                )}

                <IoMdDoneAll
                  className="list-item-list"
                  id="complete"
                  title="Complete"
                  onClick={() => onComplete(to.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
