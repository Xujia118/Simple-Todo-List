import React, { useState } from "react";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [nextId, setNextId] = useState(0);

  const [editingTaskId, setEditingTaskId] = useState(null); // Track the task being edited
  const [editedTaskText, setEditedTaskText] = useState(""); // Store the edited task text

  function handleAddTask() {
    setTaskList([
      ...taskList,
      {
        id: nextId,
        text: newTask,
      },
    ]);
    setNewTask("");
    setNextId((prevId) => prevId + 1);
  }

  function handleDeleteTask(taskId) {
    setTaskList(taskList.filter((t) => t.id !== taskId));
  }
  
  // Step 1: Find the text to update
  function handleEditTask(taskId) {
    // Set the editingTaskId and fetch the text of the task being edited
    setEditingTaskId(taskId);
    setEditedTaskText(taskList.find((t) => t.id === taskId).text);
  }

  // Step 2: Update the text and save it.
  function handleSaveEdit() {
    // Find the task being edited and updata its text
    setTaskList((prevTaskList) =>
      prevTaskList.map((task) =>
        task.id === editingTaskId ? { ...task, text: editedTaskText } : task
      )
    );

    // Resetting editing state
    setEditingTaskId(null);
    setEditedTaskText("");
  }

  return (
    <>
      <h1>Todos List</h1>
      <input
        type="text"
        value={newTask}
        placeholder="Add task"
        onChange={(event) => {
          setNewTask(event.target.value);
        }}
      />
      <button onClick={handleAddTask}>Add</button>
      {taskList.map((task) => (
        <p key={task.id}>
          {task.id === editingTaskId ? (
            <>
              <input
                type="text"
                value={editedTaskText}
                onChange={(event) => setEditedTaskText(event.target.value)}
              />
              <button onClick={handleSaveEdit}>Save</button>
            </>
          ) : (
            <>
              {task.text}
              <button onClick={() => handleEditTask(task.id)}>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </>
          )}
        </p>
      ))}
    </>
  );
}

export default App;
