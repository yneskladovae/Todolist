import {TasksStateType} from "../Typisation";
import {v1} from "uuid";


export const TasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
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
        case "ADD-EMPTY-ARRAY-TO-NEW-TODO": {
            return {...state, [action.payload.todolistId]: []};
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
    | ReturnType<typeof addEmptyArrayToNewTodotAC>

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
export const addEmptyArrayToNewTodotAC = (todolistId: string) => {
    return {
        type: "ADD-EMPTY-ARRAY-TO-NEW-TODO",
        payload: {
            todolistId,
        }
    } as const
}