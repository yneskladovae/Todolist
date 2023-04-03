import {TasksStateType} from "../Typisation";
import {v1} from "uuid";
import {
    AddNewTodolistActionType,
    RemoveTodolistActionType,
    // todolistID1,
    // todolistID2,
    TodolistsReducer
} from "./todolists-reducer";
import {useReducer} from "react";


const initialState: TasksStateType = {
    // [todolistID1]: [
    //     {id: v1(), title: 'HTML&CSS', isDone: true, isImportant: false},
    //     {id: v1(), title: 'JS', isDone: true, isImportant: false},
    //     {id: v1(), title: 'ReactJS', isDone: false, isImportant: false},
    //
    // ],
    // [todolistID2]: [
    //     {id: v1(), title: 'Rest API', isDone: true, isImportant: false},
    //     {id: v1(), title: 'GraphQL', isDone: false, isImportant: false},
    // ]
}

export const TasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK": {
            const newTask = {id: v1(), title: action.payload.newTitle, isDone: false, isImportant: false}

            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]};
        }
        case "CHANGE-CHECKBOX-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    isDone: action.payload.checkboxValue
                } : el)
            };
        }
        case "IS-IMPORTANT-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    isImportant: action.payload.isImportantValue
                } : el)
            };
        }
        case "UPDATE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.newTitle
                } : el)
            };
        }
        case "ADD-NEW-TODOLIST": {
            return {...state, [action.payload.todolistId]: []}
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState
        }
        default:
            return state
    }
}

export type ActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeCheckboxStatusAC>
    | ReturnType<typeof isImportantTaskAC>
    | ReturnType<typeof updateTaskTitleAC>
    | AddNewTodolistActionType
    | RemoveTodolistActionType

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistId,
            taskId,
        }
    } as const
}

export const addTaskAC = (todolistId: string, newTitle: string) => {

    return {
        type: "ADD-TASK",
        payload: {
            todolistId,
            newTitle,
        }
    } as const
}

export const changeCheckboxStatusAC = (todolistId: string, taskId: string, checkboxValue: boolean) => {
    return {
        type: "CHANGE-CHECKBOX-STATUS",
        payload: {
            todolistId,
            taskId,
            checkboxValue,
        }
    } as const
}

export const isImportantTaskAC = (todolistId: string, taskId: string, isImportantValue: boolean) => {
    return {
        type: "IS-IMPORTANT-TASK",
        payload: {
            todolistId,
            taskId,
            isImportantValue,
        }
    } as const
}

export const updateTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: "UPDATE-TASK-TITLE",
        payload: {
            todolistId,
            taskId,
            newTitle,
        }
    } as const
}
