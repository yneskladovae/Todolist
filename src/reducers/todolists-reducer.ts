import {FilterType, TasksStateType, TodolistsType} from "../Typisation";
import {v1} from "uuid";


export const TodolistsReducer = (state: TodolistsType[], action: ActionType): TodolistsType[] => {
    switch (action.type) {
        case "CHANGE-FILTER-VALUE": {
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.filterValue} : el)
        }
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case "UPDATE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.newTitle} : el)
        }
        case "ADD-NEW-TODOLIST": {
            // const todolistId = v1();
            const newTodolist: TodolistsType = {id: action.payload.todolistId, title: action.payload.titleValue, filter: 'all'}
            return [newTodolist, ...state]
        }
        default:
            return state
    }
}

export type ActionType =
    ReturnType<typeof changeFilterValueAC> | ReturnType<typeof removeTodolistAC> | ReturnType<typeof updateTodolistTitleAC> | ReturnType<typeof addNewTodolistAC>


export const changeFilterValueAC = (todolistId: string, filterValue: FilterType) => {
    return {
        type: "CHANGE-FILTER-VALUE",
        payload: {
            todolistId,
            filterValue,
        }
    } as const
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistId,
        }
    } as const
}

export const updateTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {
        type: "UPDATE-TODOLIST-TITLE",
        payload: {
            todolistId,
            newTitle
        }
    } as const
}

export const addNewTodolistAC = (titleValue: string, todolistId: string) => {
    return {
        type: "ADD-NEW-TODOLIST",
        payload: {
            titleValue,
            todolistId
        }
    } as const
}
