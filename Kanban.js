// Add task function
function addTask() {
  const taskName = document.getElementById("newTask").value;
  if (taskName.trim() !== "") {
    const newTask = document.createElement("div");
    const taskId = "task-" + Date.now();
    newTask.id = taskId
    newTask.classList.add("task");
    newTask.draggable = true;
    newTask.textContent = taskName;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      deleteTask(newTask);

    };

    newTask.appendChild(deleteButton);


    newTask.addEventListener("dragstart", drag);

    // Append the new task to the 'To Do' column
    document.getElementById("todo").appendChild(newTask);

    document.getElementById("newTask").value = "";
  }

}


// Drag-and-drop functions
function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData("text");
  const task = document.getElementById(taskId);
  event.target.appendChild(task);
}

function deleteTask(taskContainer) {
  taskContainer.remove();
}

