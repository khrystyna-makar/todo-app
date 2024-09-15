import ApiClient from './client';

export type Todo = {
    title: string;
    id: number;
    completed: boolean;
};

const getTodos = async () => {
    const { data } = await ApiClient.get("tasks");
    return data;
}

const addTodo = async (todo: Todo) => {
    const { data } = await ApiClient.post('tasks', todo);
    return data;
}

const deleteTodo = async (id: number) => {
    const { data } = await ApiClient.delete(`tasks/${id}`);
    return data;
}

const updateTodo = async (props: { id: number, todo: Todo }) => {
    const { data } = await ApiClient.put(`tasks/${props.id}`, props.todo);
    return data;
}

export default {
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo
};