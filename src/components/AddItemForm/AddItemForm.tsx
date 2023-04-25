import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {AddItemFormPropsType} from "../../Typisation";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export const AddItemForm: React.FC<AddItemFormPropsType> = memo(({addItem}) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState<string | null>(null)

    const addTaskOnClickHandler = () => {
        if (inputValue.trim() !== '') {
            addItem(inputValue.trim())
            setInputValue('')
            // setError(null)
            if (error) setError(null)
        } else {
            setError('Title is required')
        }

    }

    const addTaskOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const addTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null)
        if (e.code === 'Enter' && inputValue.trim() !== '') {
            addItem(inputValue.trim())
            setInputValue('')
        }
    }

    return (
        <div>
            {/*<input value={inputValue}*/}
            {/*       onChange={addTaskOnChangeHandler}*/}
            {/*       onKeyDown={addTaskOnKeyDownHandler}*/}
            {/*       className={error ? 'error' : ''}*/}
            {/*/>*/}
            <TextField value={inputValue}
                       onChange={addTaskOnChangeHandler}
                       onKeyDown={addTaskOnKeyDownHandler}
                       id="outlined-basic"
                       label={error ? 'Title is required' : 'Enter the text'}
                       variant="outlined"
                       error={!!error}
            />

            {/*<button onClick={addTaskOnClickHandler}>+</button>*/}
            <IconButton onClick={addTaskOnClickHandler} aria-label="addTask" size="large" >
                <AddBoxIcon/>
            </IconButton>

            {/*{error && <div className={'error-message '}>Title is required</div>}*/}
        </div>
    );
});