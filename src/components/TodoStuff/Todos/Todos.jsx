import React, { useEffect, useState, useRef } from "react";
import TodoHeader from "../TodoHeader/TodoHeader";
import "./todos.styles.scss";
import { v4 as uuid } from "uuid";
import Todo from "../Todo/Todo";

const Todos = () => {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [
    {
      todo: "Do one front end mentor challenge :)",
      completed: true,
      id: uuid(),
    },
  ];

  const [todosData, setTodosData] = useState(savedTodos);
  const [todosToRender, setTodosToRender] = useState(todosData);
  const [todoText, setTodoText] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todosData));
  }, [todosData]);

  const filterTodos = () => {
    let copy = todosData;
    if(filterType == "all"){
      return copy
    } else if(filterType == 'active'){
      return copy.filter(todo => todo.complete)
    } else if(filterType == "completed"){
      return copy.filter(todo => todo.complete)

    }
}

  useEffect(() => {
    let copy = filterTodos()
    setTodosToRender(copy)
  }, [filterType]);




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
            <h4 onClick={(e) => setFilterType("all")}>All</h4>
            <h4 onClick={(e) => setFilterType("active")}>Active</h4>
            <h4 onClick={(e) => setFilterType("completed")}>Completed</h4>
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
