import React, { useState } from "react";

const CreateItem = ({ addTask }) => {
  const [todoItem, setTodoItem] = useState("");
  const [itemPriority, setItemPriority] = useState("");

  const handleItemChange = (event) => setTodoItem(event.target.value);

  const handlePriorityChange = (event) => setItemPriority(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!todoItem && !itemPriority) {
      alert(
        "You must include both an item name and priority when adding an item."
      );
      setTodoItem("");
      setItemPriority("");
      return;
    }
    if (isNaN(parseInt(itemPriority, 10))) {
      alert("The priority must be a number.");
      setTodoItem("");
      setItemPriority("");
      return;
    }
    if (parseInt(itemPriority, 10) < 0) {
      alert("The priority must be a positive number.");
      setTodoItem("");
      setItemPriority("");
      return;
    }
    addTask(todoItem, parseInt(itemPriority, 10));
    setTodoItem("");
    setItemPriority("");
  };

  return (
    <div className="Form-container">
      <form onSubmit={handleSubmit}>
        <input
          className="Input"
          type="text"
          placeholder="Enter To Do Item"
          value={todoItem}
          onChange={handleItemChange}
        />
        <input
          className="Input"
          type="text"
          placeholder="Enter Priority of Item"
          value={itemPriority}
          onChange={handlePriorityChange}
        />
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export { CreateItem };
