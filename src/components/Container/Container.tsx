import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import api, { Todo } from '../../api';

type ContainerProps = {
    children: (props: ContainerChildrenProps) => React.ReactNode;
}
export type ContainerChildrenProps = {
    isLoading: boolean;
    data: Todo[];
    onAdd: (newTodo: string) => void;
    onUpdate: (newTodo: Todo) => void;
    onDelete: (id:number) => void;
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
        mutationAdd.mutate({
            title: newTodo,
            completed: false,
            id: 0
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
            id: newTodo.id,
            todo: {
                title: newTodo.title,
                completed: newTodo.completed,
                id: newTodo.id
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