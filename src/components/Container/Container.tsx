import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import api, { Todo } from '../../api';

type ContainerProps = {
    children: any;
}
export type ContainerChildrenProps = {
    isLoading: boolean;
    data: any;
    onAdd: () => void;
    onUpdate: () => void;
    onDelete: () => void;
}

const Container = ({ children }: ContainerProps) => {

    const { isLoading, data } = useQuery({ queryKey: ['todos'], queryFn: api.getTodos })

    const queryClient = useQueryClient();

    const mutationAdd = useMutation({
        mutationFn: api.addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    const onAdd = (newTodo: string) => {
        console.log(import.meta.env.VITE_BASE_URL);
        mutationAdd.mutate({
            title: newTodo,
            completed: false
        });
    }

    const mutationUpdate = useMutation({
        mutationFn: api.updateTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    const onUpdate = (newTodo: Todo) => {
        mutationUpdate.mutate({
            id: newTodo?.id!,
            todo: {
                title: newTodo.title,
                completed: newTodo.completed
            }
        });
    }

    const mutationDelete = useMutation({
        mutationFn: api.deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    const onDelete = (id: number) => {
        mutationDelete.mutate(id);
    }

    return children({ isLoading, data, onAdd, onUpdate, onDelete });
}

export default Container;