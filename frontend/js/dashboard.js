document.getElementById("taskForm").addEventListener(
    "submit", async function(event){
        event.preventDefault();

        const taskName = document.getElementById("taskName").value;
        const userId = localStorage.getItem("userId");

        const pendingTasksContainer = document.getElementById('pending-tasks');


        const doneList = document.getElementById('doneList');

        const createTaskRequest = { taskName, userId};

        
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
            console.log("Task added successfully ")
            const newDiv = document.createElement('div');
            newDiv.id = data.taskId
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = data.taskId

            checkbox.addEventListener('change', function() {
                updateTask(checkbox.id, checkbox.checked, taskName);
            });
        

            const taskNameElement = document.createElement('span');
            console.log(taskName)
            taskNameElement.innerHTML = taskName
            taskNameElement.id = data.taskId
            
            newDiv.appendChild(checkbox);
            newDiv.appendChild(taskNameElement);
            
            pendingTasksContainer.appendChild(newDiv);
        } 
        } catch (error) {
            console.error("Error during login:", error);
    }

    }
)
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
                doneItem.id = `completed-${taskId}`
                doneItem.innerHTML = taskName
                doneItem.style.textDecoration = 'line-through';
                doneList.appendChild(doneItem)
                removeElement(taskId)
            }
        
        }
    })
    .then(data => {
        console.log('Task updated successfully:', data);
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