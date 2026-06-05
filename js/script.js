// To-Do List Life Dashboard - Main JavaScript File

// DOM Elements
const elements = {
    // Theme toggle
    themeToggle: document.getElementById('themeToggle'),
    
    // Time and greeting
    currentTime: document.getElementById('currentTime'),
    currentDate: document.getElementById('currentDate'),
    greetingText: document.getElementById('greetingText'),
    userName: document.getElementById('userName'),
    saveNameBtn: document.getElementById('saveNameBtn'),
    
    // Timer
    timer: document.getElementById('timer'),
    startTimer: document.getElementById('startTimer'),
    pauseTimer: document.getElementById('pauseTimer'),
    resetTimer: document.getElementById('resetTimer'),
    timerDuration: document.getElementById('timerDuration'),
    saveTimerBtn: document.getElementById('saveTimerBtn'),
    
    // To-Do List
    taskInput: document.getElementById('taskInput'),
    addTaskBtn: document.getElementById('addTaskBtn'),
    todoList: document.getElementById('todoList'),
    taskCount: document.getElementById('taskCount'),
    clearCompletedBtn: document.getElementById('clearCompletedBtn'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    
    // Quick Links
    linkName: document.getElementById('linkName'),
    linkUrl: document.getElementById('linkUrl'),
    addLinkBtn: document.getElementById('addLinkBtn'),
    linksList: document.getElementById('linksList'),
    
    // Modal
    confirmationModal: document.getElementById('confirmationModal'),
    modalMessage: document.getElementById('modalMessage'),
    modalConfirm: document.getElementById('modalConfirm'),
    modalCancel: document.getElementById('modalCancel'),
    
    // Export/Import
    exportData: document.getElementById('exportData'),
    importData: document.getElementById('importData')
};

// Application State
const state = {
    tasks: [],
    links: [],
    userName: 'User',
    currentFilter: 'all',
    theme: localStorage.getItem('theme') || 'light'
};

// Initialize the application
function init() {
    loadFromLocalStorage();
    Timer.init(); // Initialize timer module
    setupEventListeners();
    updateTime();
    updateGreeting();
    renderTasks();
    renderLinks();
    applyTheme();
    updateTaskCount();
    
    // Start time update interval
    setInterval(updateTime, 1000);
}

// Local Storage Functions
function loadFromLocalStorage() {
    // Load tasks
    const savedTasks = localStorage.getItem('todoDashboardTasks');
    if (savedTasks) {
        state.tasks = JSON.parse(savedTasks);
    }
    
    // Load links
    const savedLinks = localStorage.getItem('todoDashboardLinks');
    if (savedLinks) {
        state.links = JSON.parse(savedLinks);
    }
    
    // Load user name
    const savedName = localStorage.getItem('todoDashboardUserName');
    if (savedName) {
        state.userName = savedName;
        elements.userName.value = savedName;
    }
    
    // Timer duration is now loaded by Timer.init()
}

function saveToLocalStorage() {
    localStorage.setItem('todoDashboardTasks', JSON.stringify(state.tasks));
    localStorage.setItem('todoDashboardLinks', JSON.stringify(state.links));
    localStorage.setItem('todoDashboardUserName', state.userName);
    localStorage.setItem('theme', state.theme);
    // Timer duration is saved by Timer.saveSettings()
}

// Theme Functions
function applyTheme() {
    document.body.setAttribute('data-theme', state.theme);
    const themeIcon = elements.themeToggle.querySelector('i');
    themeIcon.className = state.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    applyTheme();
    saveToLocalStorage();
}

// Time and Greeting Functions
function updateTime() {
    const now = new Date();
    
    // Update time
    const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    elements.currentTime.textContent = timeString;
    
    // Update date
    const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    elements.currentDate.textContent = dateString;
    
    // Update greeting every minute
    if (now.getSeconds() === 0) {
        updateGreeting();
    }
}

function updateGreeting() {
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = 'Good morning';
    } else if (hour < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }
    
    elements.greetingText.textContent = `${greeting}, ${state.userName}!`;
}

function saveUserName() {
    const name = elements.userName.value.trim();
    if (name) {
        state.userName = name;
        updateGreeting();
        saveToLocalStorage();
        showNotification('Name saved successfully!');
    }
}

// Timer Module - Clean and Organized
const Timer = {
    // Timer state management
    isRunning: false,
    isPaused: false,
    totalSeconds: 1500, // 25 minutes default
    remainingSeconds: 1500,
    intervalId: null,
    
    // UI Elements cache
    ui: {
        timer: null,
        startBtn: null,
        pauseBtn: null,
        resetBtn: null,
        durationInput: null,
        saveBtn: null,
        section: null
    },
    
    // Initialize timer
    init() {
        this.cacheUIElements();
        this.loadSettings();
        this.updateDisplay();
        this.setupEventListeners();
    },
    
    // Cache DOM elements for better performance
    cacheUIElements() {
        this.ui.timer = document.getElementById('timer');
        this.ui.startBtn = document.getElementById('startTimer');
        this.ui.pauseBtn = document.getElementById('pauseTimer');
        this.ui.resetBtn = document.getElementById('resetTimer');
        this.ui.durationInput = document.getElementById('timerDuration');
        this.ui.saveBtn = document.getElementById('saveTimerBtn');
        this.ui.section = document.querySelector('.timer-section');
    },
    
    // Load timer settings from localStorage
    loadSettings() {
        const savedDuration = localStorage.getItem('todoDashboardTimerDuration');
        if (savedDuration) {
            const duration = parseInt(savedDuration);
            if (!isNaN(duration) && duration >= 1 && duration <= 60) {
                this.totalSeconds = duration * 60;
                this.remainingSeconds = duration * 60;
                this.ui.durationInput.value = duration;
            }
        }
    },
    
    // Save timer settings to localStorage
    saveSettings() {
        localStorage.setItem('todoDashboardTimerDuration', 
            Math.floor(this.totalSeconds / 60).toString()
        );
    },
    
    // Update timer display
    updateDisplay() {
        if (!this.ui.timer) return;
        
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        
        this.ui.timer.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Visual feedback for last 60 seconds
        if (this.remainingSeconds <= 60 && this.isRunning) {
            this.ui.timer.style.color = 'var(--danger-color)';
        } else {
            this.ui.timer.style.color = '';
        }
    },
    
    // Start the timer
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.isPaused = false;
        
        // Update UI state
        this.ui.startBtn.disabled = true;
        this.ui.pauseBtn.disabled = false;
        this.ui.durationInput.disabled = true;
        this.ui.saveBtn.disabled = true;
        
        // Visual feedback
        if (this.ui.section) {
            this.ui.section.classList.add('active');
        }
        
        // Start countdown
        this.intervalId = setInterval(() => {
            this.tick();
        }, 1000);
    },
    
    // Timer tick (called every second)
    tick() {
        if (this.remainingSeconds > 0) {
            this.remainingSeconds--;
            this.updateDisplay();
            
            // Audio feedback for last 10 seconds
            if (this.remainingSeconds <= 10 && this.remainingSeconds > 0) {
                this.playTickSound();
            }
        } else {
            this.complete();
        }
    },
    
    // Pause the timer
    pause() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        this.isPaused = true;
        clearInterval(this.intervalId);
        
        // Update UI state
        this.ui.startBtn.disabled = false;
        this.ui.startBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
        this.ui.pauseBtn.disabled = true;
    },
    
    // Reset the timer
    reset() {
        clearInterval(this.intervalId);
        this.isRunning = false;
        this.isPaused = false;
        this.remainingSeconds = this.totalSeconds;
        
        // Update UI state
        this.ui.startBtn.disabled = false;
        this.ui.startBtn.innerHTML = '<i class="fas fa-play"></i> Start';
        this.ui.pauseBtn.disabled = true;
        this.ui.durationInput.disabled = false;
        this.ui.saveBtn.disabled = false;
        
        // Remove visual feedback
        if (this.ui.section) {
            this.ui.section.classList.remove('active');
        }
        
        this.updateDisplay();
    },
    
    // Timer completion
    complete() {
        clearInterval(this.intervalId);
        this.isRunning = false;
        
        // Update UI state
        this.ui.startBtn.disabled = false;
        this.ui.startBtn.innerHTML = '<i class="fas fa-play"></i> Start';
        this.ui.pauseBtn.disabled = true;
        this.ui.durationInput.disabled = false;
        this.ui.saveBtn.disabled = false;
        
        // Remove visual feedback
        if (this.ui.section) {
            this.ui.section.classList.remove('active');
        }
        
        // Play completion sound and show notification
        this.playCompletionSound();
        showNotification('Timer completed! Time for a break.');
    },
    
    // Update timer duration
    updateDuration() {
        const inputValue = this.ui.durationInput.value;
        const duration = parseInt(inputValue);
        
        // Validate input
        if (isNaN(duration) || duration < 1 || duration > 60) {
            this.ui.durationInput.value = Math.floor(this.totalSeconds / 60);
            showNotification('Please enter a duration between 1 and 60 minutes', 'error');
            return;
        }
        
        // Update timer state
        this.totalSeconds = duration * 60;
        
        if (!this.isRunning) {
            this.remainingSeconds = this.totalSeconds;
            this.updateDisplay();
        }
        
        // Save and notify
        this.saveSettings();
        showNotification(`Timer duration updated to ${duration} minutes`);
    },
    
    // Play tick sound (for last 10 seconds)
    playTickSound() {
        try {
            // Simple beep using Web Audio API
            if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                const audioContext = new AudioContextClass();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = 800;
                oscillator.type = 'sine';
                gainNode.gain.value = 0.05; // Very quiet
                
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.05);
            }
        } catch (e) {
            // Silent fallback
        }
    },
    
    // Play completion sound
    playCompletionSound() {
        try {
            // More noticeable completion sound
            if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                const audioContext = new AudioContextClass();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 1);
                oscillator.type = 'sine';
                gainNode.gain.value = 0.1;
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
                
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 1);
            }
        } catch (e) {
            // Fallback to basic browser notification
            console.log('🔔 Timer completed!');
        }
    },
    
    // Setup event listeners
    setupEventListeners() {
        // Start button
        if (this.ui.startBtn) {
            this.ui.startBtn.addEventListener('click', () => this.start());
        }
        
        // Pause button
        if (this.ui.pauseBtn) {
            this.ui.pauseBtn.addEventListener('click', () => this.pause());
        }
        
        // Reset button
        if (this.ui.resetBtn) {
            this.ui.resetBtn.addEventListener('click', () => this.reset());
        }
        
        // Save duration button
        if (this.ui.saveBtn) {
            this.ui.saveBtn.addEventListener('click', () => this.updateDuration());
        }
        
        // Duration input - Enter key support
        if (this.ui.durationInput) {
            this.ui.durationInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.updateDuration();
            });
        }
    }
};

// To-Do List Functions
function addTask() {
    const taskText = elements.taskInput.value.trim();
    
    if (!taskText) {
        showNotification('Please enter a task', 'error');
        return;
    }
    
    // Check for duplicate tasks
    const isDuplicate = state.tasks.some(task => 
        task.text.toLowerCase() === taskText.toLowerCase()
    );
    
    if (isDuplicate) {
        showNotification('This task already exists!', 'error');
        return;
    }
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    state.tasks.unshift(newTask);
    elements.taskInput.value = '';
    renderTasks();
    saveToLocalStorage();
    updateTaskCount();
    
    showNotification('Task added successfully!');
}

function toggleTaskComplete(taskId) {
    const taskIndex = state.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        state.tasks[taskIndex].completed = !state.tasks[taskIndex].completed;
        renderTasks();
        saveToLocalStorage();
        updateTaskCount();
    }
}

function editTask(taskId) {
    const taskIndex = state.tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) return;
    
    const taskItem = document.querySelector(`[data-task-id="${taskId}"]`);
    const taskText = state.tasks[taskIndex].text;
    
    taskItem.classList.add('editing');
    
    const input = taskItem.querySelector('.task-input');
    input.value = taskText;
    input.focus();
    
    function saveEdit() {
        const newText = input.value.trim();
        if (newText && newText !== taskText) {
            // Check for duplicate tasks
            const isDuplicate = state.tasks.some((task, idx) => 
                idx !== taskIndex && task.text.toLowerCase() === newText.toLowerCase()
            );
            
            if (isDuplicate) {
                showNotification('This task already exists!', 'error');
                input.value = taskText;
                return;
            }
            
            state.tasks[taskIndex].text = newText;
            renderTasks();
            saveToLocalStorage();
            showNotification('Task updated successfully!');
        } else {
            taskItem.classList.remove('editing');
        }
    }
    
    input.onblur = saveEdit;
    input.onkeypress = function(e) {
        if (e.key === 'Enter') {
            saveEdit();
        }
    };
}

function deleteTask(taskId) {
    showConfirmation('Are you sure you want to delete this task?', () => {
        state.tasks = state.tasks.filter(task => task.id !== taskId);
        renderTasks();
        saveToLocalStorage();
        updateTaskCount();
        showNotification('Task deleted successfully!');
    });
}

function clearCompletedTasks() {
    if (!state.tasks.some(task => task.completed)) {
        showNotification('No completed tasks to clear', 'error');
        return;
    }
    
    showConfirmation('Are you sure you want to clear all completed tasks?', () => {
        state.tasks = state.tasks.filter(task => !task.completed);
        renderTasks();
        saveToLocalStorage();
        updateTaskCount();
        showNotification('Completed tasks cleared successfully!');
    });
}

function filterTasks(filter) {
    state.currentFilter = filter;
    
    // Update filter buttons
    elements.filterBtns.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    renderTasks();
}

function renderTasks() {
    elements.todoList.innerHTML = '';
    
    // Filter tasks
    let filteredTasks = state.tasks;
    if (state.currentFilter === 'pending') {
        filteredTasks = state.tasks.filter(task => !task.completed);
    } else if (state.currentFilter === 'completed') {
        filteredTasks = state.tasks.filter(task => task.completed);
    }
    
    if (filteredTasks.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <i class="fas fa-clipboard-list"></i>
            <p>No ${state.currentFilter === 'all' ? '' : state.currentFilter} tasks found</p>
        `;
        elements.todoList.appendChild(emptyState);
        return;
    }
    
    filteredTasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskItem.dataset.taskId = task.id;
        
        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${escapeHtml(task.text)}</span>
            <input type="text" class="task-input" value="${escapeHtml(task.text)}">
            <div class="task-actions">
                <button class="btn-small edit-task" title="Edit task">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-small delete-task" title="Delete task">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        elements.todoList.appendChild(taskItem);
        
        // Add event listeners
        const checkbox = taskItem.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => toggleTaskComplete(task.id));
        
        const editBtn = taskItem.querySelector('.edit-task');
        editBtn.addEventListener('click', () => editTask(task.id));
        
        const deleteBtn = taskItem.querySelector('.delete-task');
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
    });
}

function updateTaskCount() {
    const totalTasks = state.tasks.length;
    const completedTasks = state.tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    
    elements.taskCount.textContent = `${totalTasks} tasks (${pendingTasks} pending, ${completedTasks} completed)`;
}

// Quick Links Functions
function addLink() {
    const name = elements.linkName.value.trim();
    const url = elements.linkUrl.value.trim();
    
    if (!name || !url) {
        showNotification('Please enter both link name and URL', 'error');
        return;
    }
    
    // Validate URL
    try {
        new URL(url);
    } catch {
        showNotification('Please enter a valid URL (include http:// or https://)', 'error');
        return;
    }
    
    const newLink = {
        id: Date.now(),
        name: name,
        url: url,
        createdAt: new Date().toISOString()
    };
    
    state.links.push(newLink);
    elements.linkName.value = '';
    elements.linkUrl.value = '';
    renderLinks();
    saveToLocalStorage();
    
    showNotification('Link added successfully!');
}

function deleteLink(linkId) {
    showConfirmation('Are you sure you want to delete this link?', () => {
        state.links = state.links.filter(link => link.id !== linkId);
        renderLinks();
        saveToLocalStorage();
        showNotification('Link deleted successfully!');
    });
}

function renderLinks() {
    elements.linksList.innerHTML = '';
    
    if (state.links.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <i class="fas fa-link"></i>
            <p>No quick links added yet</p>
        `;
        elements.linksList.appendChild(emptyState);
        return;
    }
    
    state.links.forEach(link => {
        const linkItem = document.createElement('a');
        linkItem.className = 'link-item';
        linkItem.href = link.url;
        linkItem.target = '_blank';
        linkItem.rel = 'noopener noreferrer';
        
        linkItem.innerHTML = `
            <i class="fas fa-external-link-alt link-icon"></i>
            <span class="link-text">${escapeHtml(link.name)}</span>
            <button class="link-delete" data-link-id="${link.id}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        elements.linksList.appendChild(linkItem);
        
        // Add delete button listener
        const deleteBtn = linkItem.querySelector('.link-delete');
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteLink(link.id);
        });
    });
}

// Export/Import Functions
function exportData() {
    const data = {
        tasks: state.tasks,
        links: state.links,
        userName: state.userName,
        timerDuration: Math.floor(Timer.totalSeconds / 60), // Use Timer module's duration
        theme: state.theme,
        exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `todo-dashboard-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Data exported successfully!');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const data = JSON.parse(event.target.result);
                
                showConfirmation('This will replace all current data. Continue?', () => {
                    // Import data with validation
                    if (Array.isArray(data.tasks)) {
                        state.tasks = data.tasks;
                    }
                    if (Array.isArray(data.links)) {
                        state.links = data.links;
                    }
                    if (data.userName && typeof data.userName === 'string') {
                        state.userName = data.userName;
                        elements.userName.value = data.userName;
                    }
                    if (data.timerDuration && Number.isInteger(data.timerDuration)) {
                        // Update Timer module with imported duration
                        Timer.totalSeconds = data.timerDuration * 60;
                        Timer.remainingSeconds = data.timerDuration * 60;
                        elements.timerDuration.value = data.timerDuration;
                        Timer.updateDisplay();
                        Timer.saveSettings();
                    }
                    if (data.theme && (data.theme === 'light' || data.theme === 'dark')) {
                        state.theme = data.theme;
                        applyTheme();
                    }
                    
                    renderTasks();
                    renderLinks();
                    updateGreeting();
                    updateTaskCount();
                    saveToLocalStorage();
                    
                    showNotification('Data imported successfully!');
                });
            } catch (error) {
                showNotification('Failed to import data: Invalid file format', 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// Utility Functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? '#f94144' : '#4cc9f0'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function showConfirmation(message, onConfirm) {
    elements.modalMessage.textContent = message;
    elements.confirmationModal.style.display = 'flex';
    
    const confirmHandler = () => {
        elements.confirmationModal.style.display = 'none';
        onConfirm();
        cleanup();
    };
    
    const cancelHandler = () => {
        elements.confirmationModal.style.display = 'none';
        cleanup();
    };
    
    const cleanup = () => {
        elements.modalConfirm.removeEventListener('click', confirmHandler);
        elements.modalCancel.removeEventListener('click', cancelHandler);
    };
    
    elements.modalConfirm.addEventListener('click', confirmHandler);
    elements.modalCancel.addEventListener('click', cancelHandler);
}

// Event Listeners Setup
function setupEventListeners() {
    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // User name
    elements.saveNameBtn.addEventListener('click', saveUserName);
    elements.userName.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveUserName();
    });
    
    // Timer event listeners are now handled by Timer module
    // Timer.setupEventListeners() is called in Timer.init()
    
    // To-Do List
    elements.addTaskBtn.addEventListener('click', addTask);
    elements.taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
    elements.clearCompletedBtn.addEventListener('click', clearCompletedTasks);
    
    // Filter buttons
    elements.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => filterTasks(btn.dataset.filter));
    });
    
    // Quick Links
    elements.addLinkBtn.addEventListener('click', addLink);
    elements.linkName.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addLink();
    });
    elements.linkUrl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addLink();
    });
    
    // Export/Import
    elements.exportData.addEventListener('click', exportData);
    elements.importData.addEventListener('click', importData);
    
    // Close modal when clicking outside
    elements.confirmationModal.addEventListener('click', (e) => {
        if (e.target === elements.confirmationModal) {
            elements.confirmationModal.style.display = 'none';
        }
    });
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);