import React, { useState } from "react";
import "./App.css";
import { CreateItem } from "./CreateItem";

const createTask = (task, handleClick) => {
  return (
    <li className="List-item">
      <span className="Item-priority">{`${task.priority}.`}</span>
      <span className="Item-name">{task.name}</span>
      <button
        className="button"
        onClick={() => handleClick(task.priority)}
      >
        Delete
      </button>
    </li>
  );
};

function App() {
  const [tasks, setTasks] = useState([]);
  const highestPriority = tasks.length ? tasks[tasks.length - 1].priority : 0;

  const addTask = (item, priority) => {
    const dict = prioritiesDictionary();
    if (dict[priority] === 1) {
      alert(
        "You cannot add an item with a priority that has already been assigned"
      );
      return;
    }
    const newTasks = [...tasks, { name: item, priority }];
    newTasks.sort((task1, task2) => task1.priority - task2.priority);
    setTasks(newTasks);
  };

  const handleClick = (taskPriority) => {
    const newTasks = [...tasks];
    const removedTaskList = newTasks.filter(
      (task) => task.priority !== taskPriority
    );
    setTasks(removedTaskList);
  };

  const findMissingPriorities = () => {
    const dict = prioritiesDictionary();
    const missingPrioritiesList = [];
    for (let task in dict) {
      if (dict[task] === 0) {
        missingPrioritiesList.push(task);
      }
    }
    return missingPrioritiesList;
  };

  const prioritiesDictionary = () => {
    const dict = {};
    for (let i = 1; i <= highestPriority; i++) {
      const taskPriority = [...tasks].find((task) => task.priority === i);
      dict[i] = taskPriority ? 1 : 0;
    }
    return dict;
  };

  return (
    <div className="App">
      <h2 className="Header">Ops Level Todo App</h2>
      <CreateItem addTask={addTask} />
      <div className="List-container">
        <h3 className="List-header">Todo Items</h3>
        <ul className="List">
          {tasks.map((task) => createTask(task, handleClick))}
        </ul>
      </div>
      {findMissingPriorities() ? (
        <span className="Priorities">{`Missing Priorities: ${findMissingPriorities()}`}</span>
      ) : null}
    </div>
  );
}

export default App;
