import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import {FilterType, TaskType, TodolistPropsType} from "../../Typisation";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/store";
import {
    addTaskAC,
    changeCheckboxStatusAC,
    isImportantTaskAC,
    removeTaskAC,
    updateTaskTitleAC
} from "../../state/tasks-reducer";
import {changeFilterValueAC, removeTodolistAC, updateTodolistTitleAC} from "../../state/todolists-reducer";

export const TodolistWithRedux: React.FC<TodolistPropsType> = ({todolist}) => {
    const {id, title, filter} = todolist
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[id])
    const dispatch = useDispatch()

    const removeTaskHandler = (taskId: string) => {
        dispatch(removeTaskAC(id, taskId));
    }

    const addTaskHandler = (newTitle: string) => {
        dispatch(addTaskAC(id, newTitle))
    }

    // const changeCheckboxStatusHandler = (id: string, taskId: string, e: ChangeEvent<HTMLInputElement>) => {
    //     dispatch(changeCheckboxStatusAC(id, taskId, e.currentTarget.checked))
    // }

    // const isImportantTaskHandler = (id: string, taskId: string, isImportantValue: boolean) => {
    //     dispatch(isImportantTaskAC(id, taskId, isImportantValue))
    // }

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(id))
    }

    const updateTaskTitleHandler = (taskId: string, newTitle: string) => {
        dispatch(updateTaskTitleAC(id, taskId, newTitle))
    }

    const updateTodolistTitleHandler = (newTitle: string) => {
        dispatch(updateTodolistTitleAC(id, newTitle))
    }

    const setAllFilterValue = () => dispatch(changeFilterValueAC(id, 'all'));
    const setActiveFilterValue = () => dispatch(changeFilterValueAC(id, 'active'));
    const setCompletedFilterValue = () => dispatch(changeFilterValueAC(id, 'completed'));
    const activeFilterAll = filter === 'all' ? 'contained' : 'outlined';
    const activeFilterActive = filter === 'active' ? 'contained' : 'outlined';
    const activeFilterCompleted = filter === 'completed' ? 'contained' : 'outlined';

    const stylesForIcons = {
        padding: '3px',
        border: '1px solid #757575'
    }

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

    const filterTasks: Array<TaskType> = getFilteredTasks(tasks, filter)

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
                {filterTasks.map(el => {
                    return (
                        <li key={el.id} className={el.isImportant ? 'important-task' : el.isDone ? 'is-done' : ''}>
                            <Checkbox onChange={(e) =>  dispatch(changeCheckboxStatusAC(id, el.id, e.currentTarget.checked))}  checked={el.isDone} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                            <EditableSpan oldTitle={el.title} callback={(newTitle) => updateTaskTitleHandler(el.id, newTitle)}/>
                            <IconButton onClick={() => dispatch(isImportantTaskAC(id, el.id, el.isImportant))} aria-label="change" size="large" style={stylesForIcons}>
                                <PriorityHighIcon />
                            </IconButton>
                            <IconButton onClick={() => removeTaskHandler(el.id)} aria-label="delete" size="large" style={stylesForIcons}>
                                <DeleteIcon/>
                            </IconButton>
                        </li>
                    )
                })}
            </ul>
            <div className={'filter-buttons'}>
                <Button variant={activeFilterAll} onClick={setAllFilterValue}>All</Button>
                <Button variant={activeFilterActive} onClick={setActiveFilterValue}>Active</Button>
                <Button variant={activeFilterCompleted} onClick={setCompletedFilterValue}>Completed</Button>
            </div>
        </div>
    );
};