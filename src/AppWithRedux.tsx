import React from 'react';
import './App.css';
import {FilterType, TodolistType} from "./Typisation";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {
    addTaskAC,
    changeCheckboxStatusAC,
    isImportantTaskAC,
    removeTaskAC,
    updateTaskTitleAC
} from "./state/tasks-reducer";
import {
    addNewTodolistAC,
    changeFilterValueAC,
    removeTodolistAC,
    updateTodolistTitleAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TodolistWithRedux} from "./components/TodolistWithRedux/TodolistWithRedux";

function AppWithRedux() {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    // const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const removeTask = (todolistId: string, taskId: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)});
        dispatch(removeTaskAC(todolistId, taskId))
    }

    const addTask = (todolistId: string, newTitle: string) => {
        // const newTask = {id: v1(), title: newTitle, isDone: false, isImportant: false}
        // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});

        dispatch(addTaskAC(todolistId, newTitle))
    }

    const changeCheckboxStatus = (todolistId: string, taskId: string, checkboxValue: boolean) => {
        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: checkboxValue} : el)
        // });
        dispatch(changeCheckboxStatusAC(todolistId, taskId, checkboxValue))
    }

    const changeFilterValue = (todolistId: string, filterValue: FilterType) => {
        dispatch(changeFilterValueAC(todolistId, filterValue));
    }

    const isImportantTask = (todolistId: string, taskId: string, isImportantValue: boolean) => {
        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isImportant: !isImportantValue} : el)
        // });
        dispatch(isImportantTaskAC(todolistId, taskId, !isImportantValue))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
        // delete tasks[todolistId]
        // setTasks({...tasks})
    }

    const addNewTodolist = (titleValue: string) => {
        // const newTodolist: TodolistsType = {id: todolistId, title: titleValue, filter: 'all'}
        // setTodolists([newTodolist, ...todolists])
        const action = addNewTodolistAC(titleValue)
        dispatch(action)
        // setTasks({...tasks, [todolistId]: []})
        // dispatchTasks(addEmptyArrayToNewTodotAC(todolistId))
    }

    const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        // })
        dispatch(updateTaskTitleAC(todolistId, taskId, newTitle))
    }

    const updateTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatch(updateTodolistTitleAC(todolistId, newTitle))
    }

    return (
        <div className="App">
            <AddItemForm addItem={addNewTodolist}/>
            {todolists.map(el => {
                return (
                    <TodolistWithRedux
                        todolist={el}
                    />
                )
            })}
        </div>
    );
}

export default AppWithRedux;
