import React, { useState, useEffect } from "react";
import { IoMdAddCircleOutline, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

import {
  MdOutlineDeleteForever,
  MdOutlineSaveAs,
  MdOutlineDoneAll,
  MdOutlineClear,
} from "react-icons/md";
import { TbCancel } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TodoApp.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) {
      toast.warning("Please enter a todo!");
      return;
    }
    const newTodo = { id: Date.now(), text: input.trim(), completed: false };
    setTodos((prev) => [newTodo, ...prev]);
    setInput("");
    toast.success("Todo added!");
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const toggleAllComplete = () => {
    const allCompleted = todos.every((t) => t.completed);
    setTodos((prev) => prev.map((t) => ({ ...t, completed: !allCompleted })));
    toast.info(allCompleted ? "All unmarked" : "All completed!");
  };

  const deleteTodo = (id) => {
    const todo = todos.find((t) => t.id === id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
    toast.error(`"${todo?.text}" deleted`);
  };

  const clearCompleted = () => {
    const completedCount = todos.filter((t) => t.completed).length;
    if (completedCount === 0) {
      toast.info("No completed todos to clear");
      return;
    }
    setTodos((prev) => prev.filter((t) => !t.completed));
    toast.success(`${completedCount} completed todo${completedCount > 1 ? "s" : ""} cleared`);
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (!editText.trim()) {
      toast.warning("Todo cannot be empty!");
      return;
    }
    setTodos((prev) =>
      prev.map((t) => (t.id === editId ? { ...t, text: editText.trim() } : t))
    );
    setEditId(null);
    setEditText("");
    toast.success("Todo updated!");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
    toast.info("Edit cancelled");
  };

  const activeTodoCount = todos.filter((t) => !t.completed).length;
  const hasCompleted = todos.some((t) => t.completed);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        theme="dark"
      />

      <div className="todo-container">
        <div className="todo-header">
          <div className="todo-icon" title="Todo List App">
            <IoMdCheckmarkCircleOutline />
          </div>
          <h1>TO DO LIST</h1>
        </div>

        <div className="input-wrapper">
          <div className="input-container">
            {!!todos.length && (
              <button
                onClick={toggleAllComplete}
                className="toggle-all-btn"
                aria-label="Toggle all complete"
                title="Mark All as Complete / Incomplete"
              >
                <MdOutlineDoneAll />
              </button>
            )}

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              placeholder="What needs to be done?"
              autoFocus
            />

           <button className="tooltip-btn" onClick={addTodo} aria-label="Add new todo">
  <IoMdAddCircleOutline />
  <span className="tooltip-text">Add New Todo</span>
</button>
          </div>
        </div>

        {todos.length === 0 ? (
          <p className="empty-state">No todos yet ✨ Add one above!</p>
        ) : (
          <>
            <ul className="todo-list">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`todo-item ${todo.completed ? "completed-item" : ""}`}
                >
                  {editId === todo.id ? (
                    <>
                      <input
                        className="edit-input"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit();
                          if (e.key === "Escape") cancelEdit();
                        }}
                        autoFocus
                      />
                      <div className="actions">
                         <button onClick={saveEdit} className="save-btn tooltip-btn">
    <MdOutlineSaveAs />
    <span className="tooltip-text">Save Changes</span>
  </button>

  <button onClick={cancelEdit} className="cancel-btn tooltip-btn">
    <TbCancel />
    <span className="tooltip-text">Cancel Editing</span>
  </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="todo-content"
                        onClick={() => toggleComplete(todo.id)}
                        title={todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
                      >
                        <span
                          className={`todo-checkbox ${todo.completed ? "checked" : ""}`}
                        />
                        <span
                          className={`todo-text ${todo.completed ? "completed" : ""}`}
                        >
                          {todo.text}
                        </span>
                      </div>

                      <div className="actions">
                        
                         <button
    onClick={() => toggleComplete(todo.id)}
    className={`done-btn tooltip-btn ${todo.completed ? "active" : ""}`}
  >
    <MdOutlineDoneAll />
    <span className="tooltip-text">
      {todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
    </span>
  </button>

  <button
    onClick={() => startEdit(todo)}
    className="edit-btn tooltip-btn"
  >
    <FaRegEdit />
    <span className="tooltip-text">Edit Todo</span>
  </button>

  <button
    onClick={() => deleteTodo(todo.id)}
    className="delete-btn tooltip-btn"
  >
    <MdOutlineDeleteForever />
    <span className="tooltip-text">Delete Todo</span>
  </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>

            <div className="todo-footer">
              <span className="todo-count">
                <strong>{activeTodoCount}</strong>{" "}
                {activeTodoCount === 1 ? "item" : "items"} left
              </span>

              {hasCompleted && (
                <button
                  onClick={clearCompleted}
                  className="clear-completed"
                  title="Clear All Completed Todos"
                >
                  <MdOutlineClear />
                  Clear Completed
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TodoApp; 