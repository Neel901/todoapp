document.addEventListener('DOMContentLoaded', async function() {
    const userId = localStorage.getItem("userId");
    await loadTasks(userId);
});

document.getElementById("taskForm").addEventListener(
    "submit", async function(event) {
        event.preventDefault();

        const taskName = document.getElementById("taskName").value;
        const userId = localStorage.getItem("userId");
        const pendingTasksContainer = document.getElementById('pending-tasks');
        const createTaskRequest = { taskName, userId };

        try {
            const response = await fetch('http://localhost:8080/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createTaskRequest)
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Task added successfully");
                addTaskToDOM(data.taskId, taskName, false);
            }
        } catch (error) {
            console.error("Error during task creation:", error);
        }
    }
);

function updateTask(taskId, isChecked, taskName) {
    const data = {
        taskId: taskId,
        isDone: isChecked
    };

    fetch('http://localhost:8080/task', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            if (isChecked) {
                const doneItem = document.createElement('li');
                doneItem.id = `completed-${taskId}`;
                doneItem.innerHTML = taskName;
                doneItem.style.textDecoration = 'line-through';
                document.getElementById('doneList').appendChild(doneItem);
                removeElement(taskId);
            } else {
                removeElement(`completed-${taskId}`);
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function removeElement(divId) {
    const element = document.getElementById(divId);
    if (element) {
        element.remove();
    }
}

async function loadTasks(userId) {
    try {
        const response = await fetch(`http://localhost:8080/tasks/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const tasks = await response.json();

            tasks.forEach(task => {
                addTaskToDOM(task.taskId, task.taskName, task.done);
            });
        }
    } catch (error) {
        console.error("Error loading tasks:", error);
    }
}

function addTaskToDOM(taskId, taskName, isDone) {
    const newDiv = document.createElement('div');
    newDiv.id = taskId;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = taskId;
    checkbox.checked = isDone; 

    const taskNameElement = document.createElement('span');
    taskNameElement.innerHTML = taskName;
    taskNameElement.id = taskId;

    checkbox.addEventListener('change', function() {
        updateTask(checkbox.id, checkbox.checked, taskName);
    });


    if (isDone) {
        taskNameElement.style.textDecoration = 'line-through';
        document.getElementById('doneList').appendChild(newDiv);
        
    } else {
        document.getElementById('pending-tasks').appendChild(newDiv);
        newDiv.appendChild(checkbox);
    }
    newDiv.appendChild(taskNameElement);

}

