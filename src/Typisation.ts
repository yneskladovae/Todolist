export type TodolistPropsType = {
    todolist: TodolistType
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

export type TodolistType= {
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
