import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TodolistPropsType} from "../../Typisation";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

export const Todolist: React.FC<TodolistPropsType> = ({
                                                          title,
                                                          tasks,
                                                          removeTask,
                                                          changeFilterValue,
                                                          addTask,
                                                          changeCheckboxStatus,
                                                          filter,
                                                          isImportantTask,
                                                          todolistId,
                                                          removeTodolist,
                                                          updateTaskTitle,
                                                          updateTodolistTitle
                                                      }) => {


    const removeTaskHandler = (taskId: string) => {
        removeTask(todolistId, taskId);
    }

    const addTaskHandler = (newTitle: string) => {
        addTask(todolistId, newTitle)
    }

    const changeCheckboxStatusHandler = (todolistId: string, taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        changeCheckboxStatus(todolistId, taskId, e.currentTarget.checked)
    }

    const isImportantTaskHandler = (todolistId: string, taskId: string, isImportantValue: boolean) => {
        isImportantTask(todolistId, taskId, isImportantValue)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const updateTaskTitleHandler = (taskId: string, newTitle: string) => {
        updateTaskTitle(todolistId, taskId, newTitle)
    }

    const updateTodolistTitleHandler = (newTitle: string) => {
        updateTodolistTitle(todolistId, newTitle)
    }

    const setAllFilterValue = () => changeFilterValue(todolistId, 'all');
    const setActiveFilterValue = () => changeFilterValue(todolistId, 'active');
    const setCompletedFilterValue = () => changeFilterValue(todolistId, 'completed');
    const activeFilterAll = filter === 'all' ? 'contained' : 'outlined';
    const activeFilterActive = filter === 'active' ? 'contained' : 'outlined';
    const activeFilterCompleted = filter === 'completed' ? 'contained' : 'outlined';

    const stylesForIcons = {
        padding: '3px',
        border: '1px solid #757575'
    }

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={title} callback={(newTitle) => updateTodolistTitleHandler(newTitle)}/>
                {/*<button onClick={removeTodolistHandler}>x</button>*/}
                <IconButton onClick={removeTodolistHandler} aria-label="removeTodo" size="large" style={{padding: '3px', border: '1px solid #757575'}}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {tasks?.map(el => {
                    return (
                        <li key={el.id} className={el.isImportant ? 'important-task' : el.isDone ? 'is-done' : ''}>
                            {/*<input onChange={(event) => changeCheckboxStatusHandler(todolistId, el.id, event)}*/}
                            {/*       type="checkbox"*/}
                            {/*       checked={el.isDone}/>*/}
                            <Checkbox onChange={(event) => changeCheckboxStatusHandler(todolistId, el.id, event)}  checked={el.isDone} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />

                            <EditableSpan oldTitle={el.title} callback={(newTitle) => updateTaskTitleHandler(el.id, newTitle)}/>
                            {/*<button onClick={() => isImportantTaskHandler(todolistId, el.id, el.isImportant)}>!</button>*/}
                            <IconButton onClick={() => isImportantTaskHandler(todolistId, el.id, el.isImportant)} aria-label="change" size="large" style={stylesForIcons}>
                                <PriorityHighIcon />
                            </IconButton>
                            {/*<button onClick={() => removeTaskHandler(el.id)}>x</button>*/}
                            <IconButton onClick={() => removeTaskHandler(el.id)} aria-label="delete" size="large" style={stylesForIcons}>
                                <DeleteIcon/>
                            </IconButton>
                        </li>
                    )
                })}
            </ul>
            <div className={'filter-buttons'}>
                {/*<button className={activeFilterAll} onClick={setAllFilterValue}>All</button>*/}
                {/*<button className={activeFilterActive} onClick={setActiveFilterValue}>Active</button>*/}
                {/*<button className={activeFilterCompleted} onClick={setCompletedFilterValue}>Completed</button>*/}
                <Button variant={activeFilterAll} onClick={setAllFilterValue}>All</Button>
                <Button variant={activeFilterActive} onClick={setActiveFilterValue}>Active</Button>
                <Button variant={activeFilterCompleted} onClick={setCompletedFilterValue}>Completed</Button>
            </div>
        </div>
    );
};