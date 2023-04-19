import {TasksStateType, TodolistType} from "../Typisation";
import {v1} from "uuid";

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>


type ActionsType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType

export const taskReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.payload.newTitle, isDone: false, isImportant: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]};
        case 'CHANGE-CHECKBOX-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    isDone: action.payload.checkboxValue
                } : el)
            };
        case "UPDATE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.newTitle
                } : el)
            };
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId,
            todolistId,
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

export const changeTaskStatusAC = (todolistId: string, taskId: string, checkboxValue: boolean) => {
    return {
        type: "CHANGE-CHECKBOX-STATUS",
        payload: {
            todolistId,
            taskId,
            checkboxValue,
        }
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: "UPDATE-TASK-TITLE",
        payload: {
            todolistId,
            taskId,
            newTitle,
        }
    } as const
}