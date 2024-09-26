// DOM Elements
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const allTasksBtn = document.getElementById('all-tasks');
const completedTasksBtn = document.getElementById('completed-tasks');
const uncompletedTasksBtn = document.getElementById('uncompleted-tasks');
const emptyMessage = document.querySelector('.empty-message');

// Task array to store all tasks
let tasks = [];
let editTaskId = null;  // Store task ID when editing

// Add or update a task
addTaskBtn.addEventListener('click', () => {
  const taskText = newTaskInput.value.trim();
  
  // Check if input is empty
  if (taskText === '') {
    alert('Please enter a task');
    return;
  }

  if (editTaskId) {
    // Update existing task
    const taskToEdit = tasks.find(task => task.id === editTaskId);
    taskToEdit.text = taskText;
    editTaskId = null;
    addTaskBtn.textContent = 'Add Task';  // Change button back to 'Add Task'
  } else {
    // Create a new task
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
  }

  newTaskInput.value = '';  // Clear input
  renderTasks(tasks);
});

// Render tasks in the DOM
function renderTasks(tasksToRender) {
  taskList.innerHTML = '';  // Clear existing tasks

  // If no tasks are present, show empty message
  if (tasksToRender.length === 0) {
    emptyMessage.style.display = 'block';
  } else {
    emptyMessage.style.display = 'none';
  }

  tasksToRender.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
    
    taskItem.innerHTML = `
      <span>${task.text}</span>
      <div class="task-actions">
        <button class="edit-btn">Edit</button>
        <button class="complete-btn">${task.completed ? 'Unmark' : 'Complete'}</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    // Edit task
    const editBtn = taskItem.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {
      newTaskInput.value = task.text;  // Populate input with the task text
      addTaskBtn.textContent = 'Update Task';  // Change button to 'Update Task'
      editTaskId = task.id;  // Store the task id being edited
    });

    // Complete/Uncomplete task
    const completeBtn = taskItem.querySelector('.complete-btn');
    completeBtn.addEventListener('click', () => {
      task.completed = !task.completed;
      renderTasks(tasks);
    });

    // Delete task
    const deleteBtn = taskItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks(tasks);
    });

    taskList.appendChild(taskItem);
  });
}

// Filter tasks
allTasksBtn.addEventListener('click', () => {
  renderTasks(tasks);
  setActiveFilter(allTasksBtn);
});

completedTasksBtn.addEventListener('click', () => {
  renderTasks(tasks.filter(task => task.completed));
  setActiveFilter(completedTasksBtn);
});

uncompletedTasksBtn.addEventListener('click', () => {
  renderTasks(tasks.filter(task => !task.completed));
  setActiveFilter(uncompletedTasksBtn);
});

// Set the active filter button
function setActiveFilter(activeBtn) {
  [allTasksBtn, completedTasksBtn, uncompletedTasksBtn].forEach(btn => {
    btn.classList.remove('active');
  });
  activeBtn.classList.add('active');
}

// Initial render of tasks (empty at the beginning)
renderTasks(tasks);
