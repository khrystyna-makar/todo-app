import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, TextField, styled, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'

const FormWrapper = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    column-gap: 20px;
    .title {
        flex: 80%;
    }
    .error {
        flex-basis: 100%;
        width: 0;
        color: red;
        margin-left: 10px;
     }
    .add {
        border-radius: 50%;
        height: 56px;
    }
`;

type AddTodoFormProps = {
    className: string;
    onAdd: (newTodo: string) => void;
}

const AddTodoForm = ({ className, onAdd }: AddTodoFormProps) => {

    const formik = useFormik({
        initialValues: {
            todo: ''
        },
        validationSchema: Yup.object({
            todo: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .required('Required'),
        }),
        onSubmit: values => {
            onAdd(values.todo);
            values.todo = '';
        },
    });
    return (
        <form className={className} onSubmit={formik.handleSubmit}>
            <FormWrapper>
                <TextField label="New Todo" id="todo"
                    className='title'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.todo} />
                <Button className='add' variant="contained" type="submit">
                    <AddIcon />
                </Button>
                {formik.touched.todo && formik.errors.todo ? (
                    <div className='error'>{formik.errors.todo}</div>
                ) : null}
            </FormWrapper>
        </form>
    );
};

export default AddTodoForm;

