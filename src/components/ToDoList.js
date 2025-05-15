// Importing necessary React and MUI components
import * as React from 'react';
import Container from '@mui/material/Container';
import { Button, Card, CardContent, Divider, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ToDo from './Todo';
import { useState, useMemo } from 'react';
import { useDispatch, useToDos } from '../contexts/toDosContext';
import { useToast } from '../contexts/ToastContext';

export default function ToDoList() {
  const dispatch = useDispatch();
  const todos = useToDos();
  const { showHideToast } = useToast();

  // Load todos from localStorage on component mount
  React.useEffect(() => {
    dispatch({ type: "GET_TODOS" });
  }, []);

  // Local state management
  const [titleInput, setTitleInput] = useState("");
  const [detailsInput, setDetailsInput] = useState("");
  const [filterType, setFilterType] = useState("All tasks");

  const [activeTodo, setActiveTodo] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Filter completed todos
  const completedTodos = useMemo(() => {
    return todos.filter((t) => t.isCompleted);
  }, [todos]);

  // Filter not completed todos
  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => !t.isCompleted);
  }, [todos]);

  // Filter todos based on selected filter type
  const filteredTodos = useMemo(() => {
    if (filterType === "Tasks done") {
      return completedTodos;
    } else if (filterType === "Tasks Should To Do") {
      return notCompletedTodos;
    }
    return todos; // "All tasks" filter
  }, [filterType, todos, completedTodos, notCompletedTodos]);

  // Handle edit button click
  const handleEditClick = (todo) => {
    setActiveTodo(todo);
    setTitleInput(todo.title);
    setDetailsInput(todo.details);
    setShowEditDialog(true);
  };

  // Handle delete button click
  const handleDeleteClick = (todo) => {
    setActiveTodo(todo);
    setShowDeleteDialog(true);
  };

  // Handle saving updated task
  const handleSave = () => {
    dispatch({
      type: "UPDATE_TODO",
      payload: { id: activeTodo.id, title: titleInput, details: detailsInput },
    });
    showHideToast("Updated successfully");
    setShowEditDialog(false);
  };

  // Handle deleting a task
  const handleDelete = () => {
    dispatch({
      type: "DELETE_TODO",
      payload: { id: activeTodo.id },
    });
    showHideToast("deleted successfully!");
    setShowDeleteDialog(false);
  };

  // Handle opening add task dialog
  const handleAddClick = () => {
    setTitleInput("");
    setDetailsInput("");
    setShowAddDialog(true);
  };

  // Handle adding a new task
  const handleAddSave = () => {
    dispatch({
      type: "ADD_TODO",
      payload: { title: titleInput, details: detailsInput },
    });
    showHideToast("added successfully");
    setShowAddDialog(false);
  };

  return (
    <>
      {/* Main container for the to-do list */}
      <Container maxWidth="sm" >
        <Card sx={{ minWidth: 275 }} style={{ maxHeight: "88vh", overflow: "scroll", overflowX: "hidden", opacity
        : 0.7, background: "#191b1f", borderRadius: "10px" }}>
          <CardContent>
            <Typography variant="h2" style={{color:"white"}}>My Tasks</Typography>
            <Divider />

            {/* Filter buttons */}
            <ToggleButtonGroup
                    style={{ marginTop: "20px" }}
                    value={filterType}
                    exclusive
                    onChange={(e, newValue) => {
                      if (newValue !== null) {
                        setFilterType(newValue);
                      }
                    }}
                    aria-label="Task filter"
                  >
                    <ToggleButton value="All tasks" aria-label="All tasks" sx={{
                              color: "white",
                              "&.Mui-selected:hover": {
                                    backgroundColor: "#888888",
                                    color: "white" },
                              "&:hover": {
                                    backgroundColor: "#888888",
                                    color: "white" },      
                              "&.Mui-selected": {
                                backgroundColor: "#a9a9a9",
                                color: "white",
                              },
                            }} >All Tasks
                    </ToggleButton>
                    <ToggleButton value="Tasks done" aria-label="Tasks done" sx={{
                              color: "white",
                              "&.Mui-selected:hover": {
                                    backgroundColor: "#888888",
                                    color: "white" },
                              "&:hover": {
                                    backgroundColor: "#888888",
                                    color: "white" },      
                              "&.Mui-selected": {
                                backgroundColor: "#a9a9a9",
                                color: "white",
                              },
                            }}>Completed Tasks
                    </ToggleButton>
                    <ToggleButton value="Tasks Should To Do" aria-label="Tasks Should To Do" sx={{
                              color: "white",
                              "&.Mui-selected:hover": {
                                    backgroundColor: "#888888",
                                    color: "white" },
                              "&:hover": {
                                    backgroundColor: "#888888",
                                    color: "white" },      
                              "&.Mui-selected": {
                                backgroundColor: "#a9a9a9",
                                color: "white",
                              },
                            }}>Tasks To Be Completed
                    </ToggleButton>
            </ToggleButtonGroup>

            {/* Render list of filtered todos */}
            {filteredTodos.map((t) => (
              <ToDo key={t.id} todo={t} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />
            ))}

            {/* Add new task button */}
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid size={12} style={{ textAlign: "center" }}>
                <Button variant="contained" onClick={handleAddClick} style={{ width: "100%", height: "60px", background:"black"  }}>Add NEW Task</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>

      {/* Dialog for adding a new task */}
      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField label="Title" fullWidth value={titleInput} onChange={(e) => setTitleInput(e.target.value)} style={{ marginTop: 10 }} />
          <TextField label="Details" fullWidth value={detailsInput} onChange={(e) => setDetailsInput(e.target.value)} style={{ marginTop: 10 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddSave} disabled={!titleInput || !detailsInput} autoFocus>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for editing a task */}
      <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField label="Title" fullWidth value={titleInput} onChange={(e) => setTitleInput(e.target.value)} style={{ marginTop: 10 }} />
          <TextField label="Details" fullWidth value={detailsInput} onChange={(e) => setDetailsInput(e.target.value)} style={{ marginTop: 10 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} autoFocus>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for confirming task deletion */}
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this task?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
