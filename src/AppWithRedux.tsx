import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {FilterType, TasksStateType, TaskType, TodolistsType} from "./Typisation";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {
    addTaskAC,
    changeCheckboxStatusAC,
    isImportantTaskAC,
    removeTaskAC,
    TasksReducer, updateTaskTitleAC
} from "./state/tasks-reducer";
import {
    addNewTodolistAC,
    changeFilterValueAC,
    removeTodolistAC,
    TodolistsReducer,
    updateTodolistTitleAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistsType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

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
            {todolists?.map(el => {
                const getFilteredTasks = (tasks: TaskType[], filter: FilterType): TaskType[] => {
                    switch (filter) {
                        case 'active' :
                            return tasks.filter(task => !task.isDone)
                        case "completed":
                            return tasks.filter(task => task.isDone)
                        default :
                            return tasks
                    }
                }

                const filterTasks: Array<TaskType> = getFilteredTasks(tasks[el.id], el.filter)
                return (
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={filterTasks}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeFilterValue={changeFilterValue}
                        changeCheckboxStatus={changeCheckboxStatus}
                        isImportantTask={isImportantTask}
                        removeTodolist={removeTodolist}
                        updateTaskTitle={updateTaskTitle}
                        updateTodolistTitle={updateTodolistTitle}
                        filter={el.filter}
                    />
                )
            })}
        </div>
    );
}

export default AppWithRedux;
