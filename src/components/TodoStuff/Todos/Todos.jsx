import React, { useEffect, useState, useRef } from "react";
import TodoHeader from "../TodoHeader/TodoHeader";
import "./todos.styles.scss";
import { v4 as uuid } from 'uuid';
import Todo from "../Todo/Todo";



const Todos = () => {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [{ todo: "Do one front end mentor challenge :)", completed: true, id: uuid() }]


  const [todosData, setTodosData] = useState(savedTodos)
  const [todoText, setTodoText] = useState("")


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todosData))
  }, [todosData])


 const handleOnKeyPress = (e) => {
    if(e.key == "Enter" && e.target.value.trim()){
      setTodosData(prev => [...prev, { todo: todoText, completed: false, id: uuid() }])
      setTodoText("")
    }
  }

  return (
    <div className="Todos">
      <TodoHeader />
      <div className="add-todo-container">
        <input value={todoText} placeholder="Create a new todo..." onKeyDown={handleOnKeyPress}  onChange={(e) => setTodoText(e.target.value)}  />
      </div>
      <div>
      {
        todosData.map(todoItem => <Todo {...todoItem} key={todoItem.id} todosData={todosData} setTodosData={setTodosData} />)
      }
      </div>
    </div>
  );
};

export default Todos;
