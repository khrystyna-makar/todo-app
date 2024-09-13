import { Todo } from '../../api'
import TitleTypography from '../../styles/TitleTypography';
import AddTodoForm from '../AddTodoForm';
import Container, { ContainerChildrenProps, ContainerForDialog, ContainerForDialogChildrenProps } from '../Container';
import EditTodoDialog from '../EditTodoDialog';
import StyledTodoItem from '../TodoItem';
import CircularProgress from '@mui/material/CircularProgress';

const Todos = () => {
    return (
        <Container>
            {({ isLoading, data, onAdd, onUpdate, onDelete }: ContainerChildrenProps) => {
                if (isLoading) {
                    return <CircularProgress />;
                } else {
                    return (
                        <>
                            <AddTodoForm className='AddTodoForm' onAdd={onAdd} />
                            <TitleTypography variant='h3'>ToDo List</TitleTypography>
                            <ContainerForDialog>
                                {({ dialogOpen, selectedTodo, handleOpen, handleClose }: ContainerForDialogChildrenProps) => (
                                    <>
                                        <ul>{data?.map((todo: Todo) => <StyledTodoItem key={todo.id} todo={todo} className='StyledTodoItem' onEdit={() => handleOpen(todo)} onDelete={onDelete} />)}</ul>
                                        {dialogOpen && <EditTodoDialog open={dialogOpen} handleClose={handleClose} todo={selectedTodo} onUpdate={onUpdate} />}
                                    </>
                                )}
                            </ContainerForDialog>
                        </>
                    )
                }
            }}
        </Container>
    )
}

export default Todos;