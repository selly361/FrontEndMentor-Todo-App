import React, { useEffect } from "react";
import { ReactComponent as CheckIcon } from "../../../assets/images/icon-check.svg";
import { ReactComponent as CrossIcon } from "../../../assets/images/icon-cross.svg";
import "./todo.styles.scss";


const Todo = ({ todo, completed, id, setTodosData, todosData }) => {
  let copy = todosData;


  const handleDelete = () => {
    copy = copy.filter((todo) => todo.id !== id);
    setTodosData(copy);
  };

  const handleComplete = () => {
    let foundTodo = copy.find((todo) => todo.id === id);

    foundTodo.completed = !foundTodo.completed

    localStorage.setItem("todos", JSON.stringify(copy))
    setTodosData(JSON.parse(localStorage.getItem("todos")))
};

  return (
    <div className="todo-container">
      <span className={completed ? "completed-span" : 'uncompleted-span'}>
        {completed ? (
          <div className="completed" onClick={handleComplete}>
            <CheckIcon />
          </div>
        ) : (
          <div className="uncompleted" onClick={handleComplete} />
        )}{" "}
        <h2>{todo}</h2>
      </span>
      <CrossIcon onClick={handleDelete} className="cross-icon" />
    </div>
  );
};

export default Todo;
