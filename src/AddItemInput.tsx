import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemInputType = {
    addItem:(newTitle:string)=>void
}

export const AddItemInput:React.FC<AddItemInputType> = ({addItem}) => {
    let [newTitle, setNewTitle] = useState('')
    let [error,setError] = useState<string|null>(null)
    const addTaskHandler = ()=>{
        if (newTitle.trim()!=='') {
            addItem(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required !')
        }
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setNewTitle(e.currentTarget.value)
        setError('')
    }
    const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>)=>{if (e.key==='Enter') {
        addTaskHandler()
    }}
    return (
        <div>
            <TextField value={newTitle}
                       variant={'outlined'}
                       label={'type value'}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={addTaskHandler} color={'primary'}>
                <ControlPoint/>
            </IconButton>
        </div>
    );
};

