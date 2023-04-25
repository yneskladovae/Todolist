import React, {useCallback} from 'react';
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


    const addNewTodolist = useCallback((titleValue: string) => {
        // const newTodolist: TodolistsType = {id: todolistId, title: titleValue, filter: 'all'}
        // setTodolists([newTodolist, ...todolists])
        const action = addNewTodolistAC(titleValue)
        dispatch(action)
        // setTasks({...tasks, [todolistId]: []})
        // dispatchTasks(addEmptyArrayToNewTodotAC(todolistId))
    }, [])


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
