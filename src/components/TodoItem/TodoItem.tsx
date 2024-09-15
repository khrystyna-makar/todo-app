import { Checkbox, Typography, Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import { Todo } from "../../api";

type TodoItemProps = {
    todo: Todo;
    className: string;
    onEdit: (newTodo: Todo) => void;
    onDelete: (id: number) => void;
}

const TodoItem = ({ todo, className, onEdit, onDelete }: TodoItemProps) => {

    return (
        <Box className={className}>
            <Checkbox checked={todo.completed} className="checkbox" />
            <Typography className="title">{todo.title}</Typography>
            <Box className="buttons">
                <Tooltip title="Edit">
                    <IconButton onClick={() => onEdit(todo)} aria-label="edit"> 
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton onClick={() => onDelete(todo.id)} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    )
}

export default TodoItem;
