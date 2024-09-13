import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, styled, Box, Checkbox, TextField } from '@mui/material';
import { Todo } from '../../api';

const EditFormWrapper = styled(Box)`
    display: flex;
    column-gap: 10px;
    flex-wrap: wrap;
    margin: 10px;
    .title {
        flex: 90;
    }
    .error {
        flex-basis: 100%;
        width: 0;
        color: red;
        margin-left: 54px;
    }
`;

type EditTodoDialogProps = {
    open: boolean;
    todo: Todo | null;
    handleClose: () => void;
    onUpdate: (newTodo: Todo) => void;
}

const EditTodoDialog = ({ open, todo, handleClose, onUpdate }: EditTodoDialogProps) => {

    const formik = useFormik({
        initialValues: {
            id: todo?.id || 0,
            title: todo?.title || '',
            completed: todo?.completed || false
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .required('Required'),
        }),
        enableReinitialize: true,
        onSubmit: values => {
            onUpdate(values);
            handleClose();
        },
    });

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
                Edit
            </DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <EditFormWrapper>
                        <Checkbox name='completed' checked={formik.values.completed} onChange={formik.handleChange} />
                        <TextField fullWidth id="title"
                            className='title'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={formik.values.title}
                        />
                        {formik.touched.title && formik.errors.title ? (
                            <div className='error'>{formik.errors.title}</div>
                        ) : null}
                    </EditFormWrapper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained" autoFocus>
                        Edit
                    </Button>
                </DialogActions>
            </form>
        </Dialog >
    )
}

export default EditTodoDialog;