import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanType = {
    title:string
    onChange:(newTitle:string)=>void
}

export const EditableSpan:React.FC<EditableSpanType> = ({title,onChange}) => {
    let [editMode, setEditMode] = useState(false)
    let [newTitle, setNewTitle] = useState('')
    const activateEditMode = ()=> {
        setEditMode(true)
        setNewTitle(title)
    }
    const activateViewMode = ()=> {
        setEditMode(false)
        onChange(newTitle)
    }
    const newTitleHandler = (e:ChangeEvent<HTMLInputElement>)=>{setNewTitle(e.currentTarget.value)}
    return editMode
        ? <TextField value={newTitle} onBlur={activateViewMode} onChange={newTitleHandler} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
};

