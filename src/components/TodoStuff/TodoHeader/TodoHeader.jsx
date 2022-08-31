import React, { useEffect, useState } from "react";
import { ReactComponent as SunIcon } from "../../../assets/images/icon-sun.svg";
import { ReactComponent as MonnIcon } from "../../../assets/images/icon-moon.svg";
import "./todo-header.styles.scss";

const TodoHeader = () => {
  let defaultTheme = () => {
    if (localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    } else {
      localStorage.setItem("theme", "dark");
      return "dark";
    }
  };
  const [theme, setTheme] = useState(defaultTheme());

  document.documentElement.setAttribute("data-theme", theme);

  const handleThemeSwitch = () => {
    let switchTheme = theme === "dark" ? "light" : "dark";
    setTheme(switchTheme);
    localStorage.setItem("theme", switchTheme);
  };

  return (
    <div className="todo-header">
      <h2>TODO</h2>
      {theme == "dark" ? (
        <SunIcon onClick={handleThemeSwitch} />
      ) : (
        <MonnIcon onClick={handleThemeSwitch} />
      )}
    </div>
  );
};

export default TodoHeader;
