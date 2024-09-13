import { styled } from "@mui/material";
import TodoItem from "./TodoItem";

export const StyledTodoItem = styled(TodoItem)`
    & {
        display: flex;
        align-items: center;
        .title {
            margin-right: 10px;
        }
        .buttons {
            display: flex;
            justify-content: flex-end;
            column-gap: 5px;
            margin-left: auto;
            margin-right: 0;
        }
    },
   ${(props) => {
        switch (props.todo.completed) {
            case true:
                return `
                .title {
                    display: inline;
                    color: #afafaf;
                    text-decoration: line-through;
                },
                .checkbox {
                    color: green;
                }
            `;
            case false:
                return ``;
        }
    }}
`;

export default StyledTodoItem;