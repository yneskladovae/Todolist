import {FilterType, TasksStateType, TodolistsType} from "../Typisation";
import {v1} from "uuid";

export const TodolistsReducer = (state: TodolistsType[], action: ActionType): TodolistsType[] => {
    switch (action.type) {
        case "CHANGE-FILTER-VALUE": {
            return state.map(el => el.id === action.payload.todolistId ? {
                ...el,
                filter: action.payload.filterValue
            } : el)
        }
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case "UPDATE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.newTitle} : el)
        }
        case "ADD-NEW-TODOLIST": {
            const newTodolist: TodolistsType = {
                id: action.payload.todolistId,
                title: action.payload.titleValue,
                filter: 'all'
            }
            return [...state, newTodolist]
        }
        default:
            return state
    }
}

export type AddNewTodolistActionType = ReturnType<typeof addNewTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type ActionType =
    ReturnType<typeof changeFilterValueAC>
    // | ReturnType<typeof removeTodolistAC>
    | RemoveTodolistActionType
    | ReturnType<typeof updateTodolistTitleAC>
    | AddNewTodolistActionType
    // | ReturnType<typeof addNewTodolistAC>


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

export const addNewTodolistAC = (titleValue: string) => {
    return {
        type: "ADD-NEW-TODOLIST",
        payload: {
            todolistId: v1(),
            titleValue,
        }
    } as const
}
