import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {FilterType, TasksStateType, TaskType, TodolistsType} from "./Typisation";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";

function App() {

    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true, isImportant: false},
            {id: v1(), title: 'JS', isDone: true, isImportant: false},
            {id: v1(), title: 'ReactJS', isDone: false, isImportant: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true, isImportant: false},
            {id: v1(), title: 'GraphQL', isDone: false, isImportant: false},
        ]
    })

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)});
    }

    const addTask = (todolistId: string, newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false, isImportant: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
    }

    const changeCheckboxStatus = (todolistId: string, taskId: string, checkboxValue: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: checkboxValue} : el)
        });
    }

    const changeFilterValue = (todolistId: string, filterValue: FilterType) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: filterValue} : el));
    }

    const isImportantTask = (todolistId: string, taskId: string, isImportantValue: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isImportant: !isImportantValue} : el)
        });
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addNewTodolist = (titleValue: string) => {
        const todolistId = v1();
        const newTodolist: TodolistsType = {id: todolistId, title: titleValue, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }

    const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        })
    }

    const updateTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: newTitle} : el))
    }

    return (
        <div className="App">
            < AddItemForm addItem={addNewTodolist}/>
            {todolists.map(el => {
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

export default App;
