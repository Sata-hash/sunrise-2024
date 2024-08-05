import React, { useState, useEffect } from 'react';
import { Container, List, ListItem, ListItemText, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { initializeTasks, getAllTasks, completeTask, createTask, deleteTask } from './taskManager';

function App() {
  const [tasks, setTasks] = useState(getAllTasks());
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', persona: '', group: 0 });

  useEffect(() => {
    initializeTasks();
    setTasks(getAllTasks());
  }, []);

  const handleComplete = (title: string) => {
    completeTask(title);
    setTasks(getAllTasks());
  };

  const handleCreate = () => {
    createTask(newTask.title, newTask.description, newTask.persona, newTask.group);
    setTasks(getAllTasks());
    setOpen(false);
  };

  return (
    <Container>
      <h1>Task Manager</h1>
      <Button variant="outlined" onClick={() => setOpen(true)}>Create Task</Button>
      <List>
        {tasks.map(task => (
          <ListItem key={task.id}>
            <ListItemText primary={task.title} secondary={task.description} />
            <Button onClick={() => handleComplete(task.title)}>Complete</Button>
            <Button onClick={() => {
              deleteTask(task.id);
              setTasks(getAllTasks());
            }}>Delete</Button>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Task</DialogTitle>
        <DialogContent>
          <TextField label="Title" fullWidth onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
          <TextField label="Description" fullWidth onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
          <TextField label="Persona" fullWidth onChange={e => setNewTask({ ...newTask, persona: e.target.value })} />
          <TextField label="Group" fullWidth type="number" onChange={e => setNewTask({ ...newTask, group: parseInt(e.target.value, 10) })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
