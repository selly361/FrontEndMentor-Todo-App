import React, { useEffect, useState, useRef } from "react";
import TodoHeader from "../TodoHeader/TodoHeader";
import "./todos.styles.scss";
import { v4 as uuid } from "uuid";
import Todo from "../Todo/Todo";

const Todos = () => {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [
    {
        todo: 'Complete online JavaScript course',
        completed: true,
        id: 0
    },
    {
        todo: 'Jog around the park 3x',
        completed: false,
        id: 1
    },
    {
        todo: '10 minutes meditation',
        completed: false,
        id: 2
    },
    {
        todo: 'Read for 1 hour',
        completed: false,
        id: 3
    },
    {
        todo: 'Pick up groceries',
        completed: false,
        id: 4
    },
    {
        todo: 'Complete Todo App on Frontend Mentor',
        completed: false,
        id: 5
    }]

  const [todosData, setTodosData] = useState(savedTodos);
  const [todosToRender, setTodosToRender] = useState(todosData);
  const [todoText, setTodoText] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todosData));
  }, [todosData]);

  const filterTodos = () => {
    let copy = todosData;

    return filterType === "all"
      ? copy
      : filterType === "active"
      ? copy.filter((todo) => !todo.completed)
      : filterType === "completed"
      ? copy.filter((todo) => todo.completed)
      : copy;
  };

  useEffect(() => {
    setTodosToRender(filterTodos());
  }, [filterType, todosData]);

  const handleOnKeyPress = (e) => {
    if (e.key == "Enter" && e.target.value.trim()) {
      setTodosData((prev) => [
        ...prev,
        { todo: todoText, completed: false, id: uuid() },
      ]);
      setTodoText("");
    }
  };

  const handleClearCompleted = () => {
    let uncompletedTodos = todosData.filter((todo) => !todo.completed);
    setTodosData(uncompletedTodos);
  };



  let clickedArr = [true, false, false]

  return (
    <div className="Todos">
      <TodoHeader />
      <div className="add-todo-container">
        <input
          value={todoText}
          placeholder="Create a new todo..."
          onKeyDown={handleOnKeyPress}
          onChange={(e) => setTodoText(e.target.value)}
        />
      </div>
      <div className="todo-items-container">
        {todosToRender.map((todoItem) => (
          <Todo
            {...todoItem}
            key={todoItem.id}
            todosData={todosData}
            setTodosData={setTodosData}
          />
        ))}
        <div className="bottom-section">
          <h3>
            {todosData.filter((todo) => !todo.completed).length} items left
          </h3>
          <div className="filter-container">
            <h4 className={filterType === "all" ? "active" : ""} onClick={(e) => setFilterType("all")}>All</h4>
            <h4 className={filterType === "active" ? "active" : ""} onClick={(e) => setFilterType("active")}>Active</h4>
            <h4 className={filterType === "completed" ? "active" : ""} onClick={(e) => setFilterType("completed")}>Completed</h4>
          </div>
          <div onClick={handleClearCompleted}>
            <h3>Clear Completed</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;
