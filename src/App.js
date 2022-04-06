import "./App.css";
import { Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {
  fetchTodos,
  deleteTodo,
  toggleTodo,
  updateCurrent,
  saveTodo,
} from "./actions/action";

function App() {
  const stateTodos = useSelector((state) => state);
  const dispatch = useDispatch();

  const refInput = useRef();

  console.log(stateTodos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const handleOnchange = (e) => {
    console.log(e.target.value);
    dispatch(updateCurrent(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveTodo(stateTodos.todo.currentTodo));
    refInput.current.value = "";
  };

  return (
    <Fragment>
      {stateTodos.message !== "" && <div>{stateTodos.message}</div>}
      <section className="todoapp">
        <header className="header">
          {/* <h1>todos</h1> */}
          <form onSubmit={handleSubmit}>
            <input
              ref={refInput}
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              onChange={(e) => handleOnchange(e)}
              value={stateTodos.todo.todos.currentTodo}
            />
          </form>
        </header>
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {stateTodos.todo.todos.length > 0 &&
              stateTodos.todo.todos.map((item, index) => {
                return (
                  <li
                    className={`${item.isComplete ? "completed" : ""} `}
                    key={index}
                  >
                    <div className="view">
                      <input
                        className="toggle"
                        type="checkbox"
                        checked={item.isComplete}
                        onChange={() => dispatch(toggleTodo(item.id))}
                      />
                      <label>{item.name}</label>
                      <button
                        className="destroy"
                        onClick={() => dispatch(deleteTodo(item.id))}
                      ></button>
                    </div>
                    <input className="edit" value="Create a TodoMVC template" />
                  </li>
                );
              })}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>
              {stateTodos.todo.todos.length > 0
                ? stateTodos.todo.todos.length
                : 0}
            </strong>{" "}
            item left
          </span>
          <ul className="filters">
            <li>
              <address className="selected" href="/">
                All
              </address>
            </li>
            <li>
              <a href="/active">Active</a>
            </li>
            <li>
              <a href="/completed">Completed</a>
            </li>
          </ul>
          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>
    </Fragment>
  );
}

export default App;
