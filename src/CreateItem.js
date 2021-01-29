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
      return;
    }
    addTask(todoItem, itemPriority);
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
