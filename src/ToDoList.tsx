import React, {ChangeEvent} from 'react';
import {filterType, tasksType} from "./App";
import {AddItemInput} from "./AddItemInput";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from "@mui/icons-material";

type ToDoListType = {
    id: string
    title: string
    tasks: tasksType[]
    removeTask: (id: string, todolistId: string) => void
    filterTask: (value: filterType, todolistId: string) => void
    addTask: (newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    filter: filterType
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const ToDoList: React.FC<ToDoListType> = ({
                                                     title,
                                                     tasks,
                                                     removeTask,
                                                     filterTask,
                                                     addTask,
                                                     changeTaskStatus,
                                                     filter,
                                                     id,
                                                     removeTodolist,
                                                     changeTaskTitle,
                                                     changeTodolistTitle
                                                 }) => {
    const removeTodolistHandler = () => {
        removeTodolist(id)
    }
    const addTasks = (newTitle: string) => {
        addTask(newTitle, id)
    }
    const onChangeTodolistHandler = (newTitle: string) => {
        changeTodolistTitle(id, newTitle)
    }
    const onClickAllHandler = () => {
        filterTask('all', id)
    }
    const onClickActiveHandler = () => {
        filterTask('active', id)
    }
    const onClickCompletedHandler = () => {
        filterTask('completed', id)
    }
    return (
        <div>
            <h3>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
                <EditableSpan title={title} onChange={onChangeTodolistHandler}/>
            </h3>
            <AddItemInput addItem={addTasks}/>
            <div>
                {tasks.map((t) => {
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newTaskStatus = e.currentTarget.checked
                        changeTaskStatus(t.id, newTaskStatus, id)
                    }
                    const changeTaskTitleHandler = (newTitle: string) => {
                        changeTaskTitle(t.id, newTitle, id)
                    }
                    const removeTaskHandler = () => {
                        removeTask(t.id, id)
                    }
                    return (
                        <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <IconButton onClick={removeTaskHandler}>
                                <Delete/>
                            </IconButton>
                            <Checkbox
                                   checked={t.isDone}
                                   onChange={changeTaskStatusHandler}
                            />
                            <EditableSpan title={t.title} onChange={changeTaskTitleHandler}/>
                        </div>
                    )
                })}
            </div>
            <div>
                <Button variant={filter === 'all' ? "contained" : "text"} onClick={onClickAllHandler}>All</Button>
                <Button color={'primary'} variant={filter === 'active' ? "contained" : "text"} onClick={onClickActiveHandler}>Active</Button>
                <Button color={'secondary'} variant={filter === 'completed' ? "contained" : "text"} onClick={onClickCompletedHandler}>Completed</Button>
            </div>
        </div>
    );
};

