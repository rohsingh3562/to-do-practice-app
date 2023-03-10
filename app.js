// Retrieve tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.addEventListener("load", () => {
  const form = document.querySelector("#take-tasks");
  const input = document.querySelector("#task-input");
  const tasksContainer = document.querySelector(".tasks");

  // Render tasks from local storage
  tasks.forEach((task) => {
    const newTask = createTaskElement(task);
    tasksContainer.prepend(newTask);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const task = input.value;

    if (!task) {
      alert("Please write some task");
      return;
    }

    const newTask = createTaskElement(task);
    tasksContainer.prepend(newTask);

    // Add task to local storage
    tasks.unshift(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
  });

  // Create task element
  function createTaskElement(task) {
    const newTask = document.createElement("div");
    newTask.classList.add("task");

    const newTaskContent = document.createElement("div");
    newTaskContent.classList.add("content");
    newTask.appendChild(newTaskContent);

    const taskContentInput = document.createElement("input");
    taskContentInput.classList.add("text");
    taskContentInput.type = "text";
    taskContentInput.value = task;
    taskContentInput.setAttribute("readonly", "readonly");
    newTaskContent.appendChild(taskContentInput);
    taskContentInput.innerText = task;

    const actionBtns = document.createElement("div");
    actionBtns.classList.add("actions");
    newTask.appendChild(actionBtns);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("done");
    doneBtn.innerHTML = "Done";
    actionBtns.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.innerHTML = "Edit";
    actionBtns.appendChild(editBtn);

    const delBtn = document.createElement("button");
    delBtn.classList.add("delete");
    delBtn.innerHTML = "Delete";
    actionBtns.appendChild(delBtn);

    doneBtn.addEventListener("click", () => {
      taskContentInput.style.textDecoration = "line-through";
      taskContentInput.setAttribute("readonly", "readonly");
    });

    editBtn.addEventListener("click", () => {
      if (editBtn.innerText.toLowerCase() == "edit") {
        taskContentInput.removeAttribute("readonly", "readonly");
        taskContentInput.focus();
        editBtn.innerText = "Save";
        taskContentInput.style.textDecoration = "none";
      } else {
        editBtn.innerText = "Edit";
        taskContentInput.setAttribute("readonly", "readonly");
        // Update task in local storage
        const taskIndex = tasks.findIndex((t) => t === task);
        tasks[taskIndex] = taskContentInput.value;
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    });

    delBtn.addEventListener("click", () => {
      if (confirm("Have you done this task?")) {
        tasks = tasks.filter((t) => t !== task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        newTask.remove();
      }
    });

    return newTask;
  }
});
