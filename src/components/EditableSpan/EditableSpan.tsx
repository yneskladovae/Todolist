import React, {useState, ChangeEvent, KeyboardEvent, memo} from 'react';
import {EditableSpanPropsType} from "../../Typisation";
import CreateIcon from '@mui/icons-material/Create';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TextField from '@mui/material/TextField';


export const EditableSpan: React.FC<EditableSpanPropsType> = memo(({oldTitle, callback}) => {
    console.log('EditableSpan')

    const [editMode, setEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState(oldTitle);

    const activateEditMode = () => {
        setEditMode(true)
    }

    const activateViewMode = () => {
        setEditMode(false)
        addItem()
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addItem = () => {
        callback(newTitle)
    }

    const addItemOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            setEditMode(false)
            addItem()
        }
    }
    const stylesForIcons = {
        padding: '3px',
        border: '1px solid #757575'
    }

    return <>
        {editMode
            ? <>
                {/*<input value={newTitle} onBlur={activateViewMode} onChange={changeTitle} onKeyDown={addItemOnKeyDownHandler} autoFocus/>*/}
                <TextField
                    value={newTitle}
                    onBlur={activateViewMode}
                    onChange={changeTitle}
                    onKeyDown={addItemOnKeyDownHandler}
                    autoFocus
                    id="standard-basic"
                    label="Text editing"
                    variant="standard" />
                {/*<button onClick={addItem}>+</button>*/}
                <IconButton onClick={addItem} aria-label="addItem" size="large"  style={{padding: '0px'}}>
                    <AddBoxIcon/>
                </IconButton>
            </>
            : <>
                <span onDoubleClick={activateEditMode}>{oldTitle}</span>
                {/*<button onClick={activateEditMode}>*/}
                {/*    &#9998;*/}
                {/*</button>*/}

                <IconButton onClick={activateEditMode} aria-label="edit" size="large" style={stylesForIcons}>
                    <CreateIcon />
                </IconButton>
            </>
        }
    </>

});