"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/todo.ts
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
class TodoApp {
    tasks = [];
    constructor() {
        this.loadTasks();
    }
    loadTasks() {
        try {
            const data = fs_1.default.readFileSync('tasks.json', 'utf-8');
            this.tasks = JSON.parse(data);
        }
        catch (error) {
            console.log('No saved tasks found.');
        }
    }
    saveTasks() {
        fs_1.default.writeFileSync('tasks.json', JSON.stringify(this.tasks, null, 2));
    }
    addTask(description) {
        const newTask = { description, completed: false };
        this.tasks.push(newTask);
        this.saveTasks();
        console.log('Task added.');
    }
    listTasks() {
        if (this.tasks.length === 0) {
            console.log('No tasks to display.');
        }
        else {
            console.log('Tasks:');
            this.tasks.forEach((task, index) => {
                const status = task.completed ? '[x]' : '[ ]';
                console.log(`${index + 1}. ${status} ${task.description}`);
            });
        }
    }
    toggleTaskCompletion(taskIndex) {
        if (taskIndex >= 0 && taskIndex < this.tasks.length) {
            this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
            this.saveTasks();
            console.log('Task status updated.');
        }
        else {
            console.log('Invalid task number.');
        }
    }
}
const todoApp = new TodoApp();
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const menu = () => {
    rl.question('Select an option (Add a task, List tasks, Toggle task completion, Quit): ', (option) => {
        switch (option.toLowerCase()) {
            case 'add a task':
                addTask();
                break;
            case 'list tasks':
                listTasks();
                break;
            case 'toggle task completion':
                toggleTaskCompletion();
                break;
            case 'quit':
                console.log('Goodbye!');
                rl.close();
                break;
            default:
                console.log('Invalid option. Please try again.');
                menu();
                break;
        }
    });
};
const addTask = () => {
    rl.question('Enter a new task: ', (description) => {
        todoApp.addTask(description);
        menu();
    });
};
const listTasks = () => {
    todoApp.listTasks();
    menu();
};
const toggleTaskCompletion = () => {
    rl.question('Enter the task number to toggle completion: ', (taskIndex) => {
        const index = parseInt(taskIndex) - 1;
        todoApp.toggleTaskCompletion(index);
        menu();
    });
};
menu();
