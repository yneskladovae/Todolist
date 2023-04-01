import {TasksStateType, TodolistsType} from "../Typisation";
import {addNewTodolistAC, TodolistsReducer} from "./todolists-reducer";
import {TasksReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistsType> = [];

    const action = addNewTodolistAC("new todolist");

    const endTasksState = TasksReducer(startTasksState, action)
    const endTodolistsState = TodolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolistId);
    expect(idFromTodolists).toBe(action.payload.todolistId);
});
