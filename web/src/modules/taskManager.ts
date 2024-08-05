import Task from '@/model/Task';
import { initialTasks } from '@/utils/TaskList';

let tasks: Task[] = [...initialTasks];

export function initializeTasks() {
  tasks = [...initialTasks];
}

export function getActiveTasks(): Task[] {
  const minCompletedGroup = Math.min(...tasks.filter(task => task.completed).map(task => task.group), Infinity);
  const maxIncompleteGroup = Math.min(...tasks.filter(task => !task.completed).map(task => task.group), minCompletedGroup + 1);
  return tasks.filter(task => !task.completed && task.group <= maxIncompleteGroup);
}

export function getCompletedTasks(): Task[] {
  return tasks.filter(task => task.completed);
}

export function getAllTasks(): Task[] {
  return tasks;
}

export function completeTask(taskTitle: string): void {
  const task = tasks.find(task => task.title === taskTitle);
  if (task) {
    task.completed = true;
  }
}

export function createTask(title: string, description: string, persona: string, group: number): void {
  const newTask: Task = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    description,
    persona,
    group,
    completed: false,
  };
  tasks.push(newTask);
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
  }
}

export function deleteTask(taskId: number): void {
  tasks = tasks.filter(task => task.id !== taskId);
}
