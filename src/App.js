import React, { useState } from "react";
import "./App.css";
import { CreateItem } from "./CreateItem";

const createTask = (task, index, handleClick) => {
  return (
    <li className="List-item">
      <span className="Item-priority">{`${task.priority}.`}</span>
      <span className="Item-name">{task.name}</span>
      <button className="button" onClick={() => handleClick(task.name)}>
        Delete
      </button>
    </li>
  );
};

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (item, priority) => {
    const newTasks = [...tasks, { name: item, priority }];
    setTasks(newTasks);
  };

  const handleClick = (taskName) => {
    const newTasks = [...tasks];
    const removedTaskList = newTasks.filter((task) => task.name !== taskName);
    setTasks(removedTaskList);
  };

  const findMissingPriorities = () => {
    if (!tasks.length) {
      return null;
    }
    const newTasks = [...tasks];
    const sortedTasks = newTasks.sort((task1, task2) => task1.priority - task2.priority);
    const highestPriority = sortedTasks[sortedTasks.length - 1].priority;
    const dict = prioritiesDictionary(highestPriority, sortedTasks);

    const missingPrioritiesList = [];
    for (let task in dict) {
      if (dict[task] === 0) {
        missingPrioritiesList.push(task);
      }
    }
    return missingPrioritiesList;
  };

  const prioritiesDictionary = (highestPriority, sortedTasks) => {
    const dict = {};
    for (let i = 1; i <= highestPriority; i++) {
      const taskPriority = sortedTasks.find(
        (task) => task.priority === i
      );
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
          {tasks.map((task, index) => createTask(task, index, handleClick))}
        </ul>
      </div>
      {findMissingPriorities() ? (
        <span className="Priorities">{`Missing Priorities: ${findMissingPriorities()}`}</span>
      ) : null}
    </div>
  );
}

export default App;
