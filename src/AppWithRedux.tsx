import React, {useCallback} from 'react';
import './App.css';
import {TodolistType} from "./Typisation";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {addNewTodolistAC,} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TodolistWithRedux} from "./components/TodolistWithRedux/TodolistWithRedux";

function AppWithRedux() {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)

    const addNewTodolist = useCallback((titleValue: string) => {
        const action = addNewTodolistAC(titleValue)
        dispatch(action)
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
