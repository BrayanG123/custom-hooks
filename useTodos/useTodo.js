import { useEffect, useReducer } from "react";
import { todoReducer } from "./TodoReducer";


const initialState = [
    // {
    //     id: new Date().getTime(),
    //     description: 'Recolectar la piedra del alma',
    //     done: false
    // },
    
]

const init = () => {
    return JSON.parse( localStorage.getItem('todos')) || []; 
}


export const useTodo = () => {


    const [todos, dispatch] = useReducer( todoReducer, initialState, init )

    useEffect(() => {
    localStorage.setItem('todos', JSON.stringify( todos ) || []);
    
    }, [todos])


    const handleNewTodo = (todo) => {

        const action = {
            type: 'Add Todo',
            payload: todo
        }

        dispatch( action );
    }

    const handleRemoveTodo = (id) => {

        dispatch({
            type: 'Remove Todo',
            payload: id
        });

    }

    const handleToggleTodo = (id) => {

        dispatch({
            type: 'Toggle Todo',
            payload: id
        });
    }

    return {
        todos,
        handleNewTodo,
        handleRemoveTodo,
        handleToggleTodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter( todo => !todo.done  ).length
    }
        
    
}
