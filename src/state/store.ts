import {combineReducers, legacy_createStore as createStore} from "redux";
import {TasksReducer} from "./tasks-reducer";
import {TodolistsReducer} from "./todolists-reducer";

const rootReducer = combineReducers({
    todolists: TodolistsReducer,
    tasks: TasksReducer,
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store;