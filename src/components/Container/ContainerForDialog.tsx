import { useEffect, useState } from "react";
import { Todo } from "../../api";

type ContainerProps = {
    children: any;
}
export type ContainerForDialogChildrenProps = {
    dialogOpen: boolean;
    selectedTodo: Todo;
    handleOpen: (todo: Todo | null) => void;
    handleClose: () => void;
}

const ContainerForDialog = ({ children }: ContainerProps) => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

    useEffect(() => {
        if (selectedTodo) {
            setDialogOpen(true);
        }
    }, [selectedTodo]);

    const handleOpen = (todo: Todo | null) => {
        setSelectedTodo(todo);
    };

    const handleClose = () => {
        setDialogOpen(false);
        setSelectedTodo(null);
    };
    
    return children({ dialogOpen, selectedTodo, handleOpen, handleClose });
}

export default ContainerForDialog;
