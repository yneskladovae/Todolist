import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {AddItemFormPropsType} from "../../Typisation";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';

export const AddItemForm: React.FC<AddItemFormPropsType> = memo(({addItem}) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState<string | null>(null)

    const addTaskOnClickHandler = () => {
        if (inputValue.trim() !== '') {
            addItem(inputValue.trim())
            setInputValue('')
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
            <TextField value={inputValue}
                       onChange={addTaskOnChangeHandler}
                       onKeyDown={addTaskOnKeyDownHandler}
                       id="outlined-basic"
                       label={error ? 'Title is required' : 'Enter the text'}
                       variant="outlined"
                       error={!!error}
            />
            <IconButton onClick={addTaskOnClickHandler} aria-label="addTask" size="large" >
                <AddBoxIcon/>
            </IconButton>
        </div>
    );
});