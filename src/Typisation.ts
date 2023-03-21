export type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, newTitle: string) => void
    changeFilterValue: (todolistId:string, filterValue: FilterType) => void
    changeCheckboxStatus: (todolistId: string, taskId: string, checkboxValue: boolean) => void
    filter: FilterType
    isImportantTask:(todolistId: string, taskId: string, isImportantValue: boolean) => void
    removeTodolist: (todolistId: string) => void
    updateTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    updateTodolistTitle: (todolistId: string, newTitle: string) => void
}

export type TasksStateType = {
    [key: string] :TaskType[]
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
    isImportant: boolean
}

export type TodolistsType= {
    id: string
    title: string
    filter: FilterType
}

export type FilterType = 'all' | 'active' | 'completed'

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export type EditableSpanPropsType = {
    oldTitle: string
    callback: (newTitle: string) => void
}
