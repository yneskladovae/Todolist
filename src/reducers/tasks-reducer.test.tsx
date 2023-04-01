import {TasksStateType} from "../Typisation";
import {v1} from "uuid";
import {
    addTaskAC,
    changeCheckboxStatusAC,
    isImportantTaskAC,
    removeTaskAC,
    TasksReducer,
    updateTaskTitleAC
} from "./tasks-reducer";
import {addNewTodolistAC, removeTodolistAC} from "./todolists-reducer";


test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: '1', title: 'HTML&CSS', isDone: true, isImportant: false},
            {id: '2', title: 'JS', isDone: true, isImportant: false},
            {id: '3', title: 'ReactJS', isDone: false, isImportant: false},

        ],
        "todolistId2": [
            {id: '1', title: 'Rest API', isDone: true, isImportant: false},
            {id: '2', title: 'GraphQL', isDone: false, isImportant: false},
            {id: '3', title: 'Redux', isDone: false, isImportant: false},
        ]
    };

    const action = removeTaskAC("todolistId2","2" );
    const endState = TasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: '1', title: 'HTML&CSS', isDone: true, isImportant: false},
            {id: '2', title: 'JS', isDone: true, isImportant: false},
            {id: '3', title: 'ReactJS', isDone: false, isImportant: false},

        ],
        "todolistId2": [
            {id: '1', title: 'Rest API', isDone: true, isImportant: false},
            {id: '3', title: 'Redux', isDone: false, isImportant: false},
        ]
    });

});

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: '1', title: 'HTML&CSS', isDone: true, isImportant: false},
            {id: '2', title: 'JS', isDone: true, isImportant: false},
            {id: '3', title: 'ReactJS', isDone: false, isImportant: false},

        ],
        "todolistId2": [
            {id: '1', title: 'Rest API', isDone: true, isImportant: false},
            {id: '2', title: 'GraphQL', isDone: false, isImportant: false},
            {id: '3', title: 'Redux', isDone: false, isImportant: false},
        ]
    };

    const action = addTaskAC("todolistId2", "juice");
    const endState = TasksReducer(startState, action);

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].isDone).toBe(false);
});

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: '1', title: 'HTML&CSS', isDone: true, isImportant: false},
            {id: '2', title: 'JS', isDone: true, isImportant: false},
            {id: '3', title: 'ReactJS', isDone: false, isImportant: false},

        ],
        "todolistId2": [
            {id: '1', title: 'Rest API', isDone: true, isImportant: false},
            {id: '2', title: 'GraphQL', isDone: true, isImportant: false},
            {id: '3', title: 'Redux', isDone: false, isImportant: false},
        ]
    };

    const action = changeCheckboxStatusAC("todolistId2", "2", false );

    const endState = TasksReducer(startState, action)

    expect(endState["todolistId2"][1].isDone).toBe(false);
    expect(endState["todolistId1"][1].isDone).toBe(true);
});

test('important task status of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: '1', title: 'HTML&CSS', isDone: true, isImportant: false},
            {id: '2', title: 'JS', isDone: true, isImportant: false},
            {id: '3', title: 'ReactJS', isDone: false, isImportant: false},

        ],
        "todolistId2": [
            {id: '1', title: 'Rest API', isDone: true, isImportant: false},
            {id: '2', title: 'GraphQL', isDone: true, isImportant: false},
            {id: '3', title: 'Redux', isDone: false, isImportant: false},
        ]
    };

    const action = isImportantTaskAC("todolistId2", "2", true );

    const endState = TasksReducer(startState, action)

    expect(endState["todolistId2"][1].isImportant).toBe(true);
    expect(endState["todolistId1"][1].isImportant).toBe(false);
});

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: '1', title: 'HTML&CSS', isDone: true, isImportant: false},
            {id: '2', title: 'JS', isDone: true, isImportant: false},
            {id: '3', title: 'ReactJS', isDone: false, isImportant: false},

        ],
        "todolistId2": [
            {id: '1', title: 'Rest API', isDone: true, isImportant: false},
            {id: '2', title: 'GraphQL', isDone: false, isImportant: false},
            {id: '3', title: 'Redux', isDone: false, isImportant: false},
        ]
    };

    const action = updateTaskTitleAC("todolistId2", "2", "beer" );

    const endState = TasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("beer");
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: '1', title: 'HTML&CSS', isDone: true, isImportant: false},
            {id: '2', title: 'JS', isDone: true, isImportant: false},
            {id: '3', title: 'ReactJS', isDone: false, isImportant: false},

        ],
        "todolistId2": [
            {id: '1', title: 'Rest API', isDone: true, isImportant: false},
            {id: '2', title: 'GraphQL', isDone: false, isImportant: false},
            {id: '3', title: 'Redux', isDone: false, isImportant: false},
        ]
    };

    const action = addNewTodolistAC("new todolist");

    const endState = TasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: '1', title: 'HTML&CSS', isDone: true, isImportant: false},
            {id: '2', title: 'JS', isDone: true, isImportant: false},
            {id: '3', title: 'ReactJS', isDone: false, isImportant: false},

        ],
        "todolistId2": [
            {id: '1', title: 'Rest API', isDone: true, isImportant: false},
            {id: '2', title: 'GraphQL', isDone: false, isImportant: false},
            {id: '3', title: 'Redux', isDone: false, isImportant: false},
        ]
    };

    const action = removeTodolistAC("todolistId2");

    const endState = TasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});