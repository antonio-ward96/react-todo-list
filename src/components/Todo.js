import { Card, CardContent, Grid, Typography, IconButton } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "../contexts/toDosContext";
import { useToast } from "../contexts/ToastContext";

export default function ToDo({ todo, onEditClick, onDeleteClick }) {
    
    const dispatch = useDispatch();
    const { showHideToast } = useToast();

    const handleCheckClick = () => {
        dispatch({
            type: "TOGGLE_TODO",
            payload: { id: todo.id },
        });
        showHideToast(todo.isCompleted ? "Task marked as not completed" : "Task completed successfully");
    };

    return (
        <Card className="toDoCard" sx={{ minWidth: 275, marginTop: 5 }} style={{ background: "black", borderRadius: "10px", color: "white" }}>
            <CardContent>
                <Grid container spacing={2}> 
                    <Grid size={8}>
                        <Typography variant="h4" sx={{ textAlign: "left", textDecoration: todo.isCompleted ? "line-through" : "none" }}>{todo.title}</Typography>
                        <Typography variant="h5" style={{ textAlign: "left" }}>{todo.details}</Typography>
                    </Grid>
                    <Grid size={4} style={{ textAlign: "right" }} display="flex" justifyContent="space-around" alignItems="center">
                        <IconButton
                            className="iconButton"
                            onClick={handleCheckClick}
                            aria-label="complete"
                            style={{
                                color: todo.isCompleted ? " #090909" : "#d3d3d3",
                                background: todo.isCompleted ? "grey" : "#090909",
                                border: "solid grey 3px",
                            }}
                        >
                            <CheckIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => onEditClick(todo)}
                            className="iconButton"
                            aria-label="edit"
                            style={{
                                color: "blue",
                                border: "solid grey",
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => onDeleteClick(todo)}
                            className="iconButton"
                            aria-label="delete"
                            style={{
                                color: "red",
                                border: "solid grey",
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
