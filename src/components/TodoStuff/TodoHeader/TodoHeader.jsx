import React, { useEffect, useState } from "react";
import { ReactComponent as SunIcon } from "../../../assets/images/icon-sun.svg";
import { ReactComponent as MonnIcon } from "../../../assets/images/icon-moon.svg";
import "./todo-header.styles.scss";

const TodoHeader = () => {
  let defaultTheme = () => {
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    } else {
      let preferableTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      localStorage.setItem("theme", preferableTheme);
      return preferableTheme;
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
