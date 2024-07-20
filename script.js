var tasks = []; // Global array to store tasks

function startAddingTasks() {
    var taskCountInput = document.getElementById("taskCountInput");
    var taskInputsContainer = document.getElementById("taskInputs");
    var taskCount = parseInt(taskCountInput.value);

    // Clear previous task inputs and tasks array
    taskInputsContainer.innerHTML = "";
    tasks = [];

    for (var i = 0; i < taskCount; i++) {
        var taskLabel = document.createElement("label");
        taskLabel.textContent = "Task " + (i + 1) + " description:";
        
        var taskInput = document.createElement("input");
        taskInput.type = "text";
        taskInput.name = "taskDescription" + (i + 1);
        taskInput.placeholder = "Enter task " + (i + 1) + " description";

        var timeLabel = document.createElement("label");
        timeLabel.textContent = "Expected time for task " + (i + 1) + " (in minutes):";

        var timeInput = document.createElement("input");
        timeInput.type = "number";
        timeInput.name = "taskTime" + (i + 1);
        timeInput.min = "0";
        timeInput.placeholder = "Enter time in minutes";

        taskInputsContainer.appendChild(taskLabel);
        taskInputsContainer.appendChild(taskInput);
        taskInputsContainer.appendChild(document.createElement("br"));
        taskInputsContainer.appendChild(timeLabel);
        taskInputsContainer.appendChild(timeInput);
        taskInputsContainer.appendChild(document.createElement("br"));
    }
}

function saveTasks() {
    var taskInputs = document.querySelectorAll("#taskInputs input[type='text']");
    var timeInputs = document.querySelectorAll("#taskInputs input[type='number']");

    if (taskInputs.length !== timeInputs.length) {
        alert("Error: Each task must have a corresponding time!");
        return;
    }

    tasks = []; // Clear existing tasks array

    for (var i = 0; i < taskInputs.length; i++) {
        var taskDescription = taskInputs[i].value.trim();
        var taskTime = parseInt(timeInputs[i].value);

        if (taskDescription !== "" && !isNaN(taskTime) && taskTime >= 0) {
            tasks.push({
                description: taskDescription,
                time: taskTime
            });
        } else {
            alert("Error: Task " + (i + 1) + " has invalid input!");
            return;
        }
    }

    // Save tasks to localStorage or pass to next page via query parameters or session storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Redirect to tasklist.html with a query parameter
    window.location.href = "tasklist.html?saved=true";
}



