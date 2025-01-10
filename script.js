document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task));
        updateTaskList();
        updateStats();
    }
});

let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTaskList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text; // Pre-fill input field
    tasks.splice(index, 1); // Remove the task to be edited
    updateTaskList();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completeTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;

    const progress = totalTasks > 0 ? (completeTasks / totalTasks) * 100 : 0;
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`; // Use 'width' instead of 'windows'

    document.getElementById("number").innerText = `${completeTasks}/${totalTasks}`;
};

const updateTaskList = () => {
    const taskList = document.getElementById("tasks");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="edit.png" onclick="editTask(${index})" alt="Edit" />
                    <img src="delete.png" onclick="deleteTask(${index})" alt="Delete" />
                </div>
            </div>
        `;

        // Add event listener for checkbox
        listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));

        taskList.append(listItem);
    });
};

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});
