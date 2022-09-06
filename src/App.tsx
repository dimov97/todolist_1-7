import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {AddItemInput} from "./AddItemInput";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from "@mui/icons-material";

export type tasksType = {
    id: string
    title: string
    isDone: boolean
}
export type filterType = 'all' | 'active' | 'completed'
type todolistsType = {
    id: string
    title: string
    filter: filterType
}
type tasksStateType = {
    [key: string]: tasksType[]
}


function App() {
    function filterTask(value: filterType, todolistId: string) {
        let todolistTask = todolists.find(tl => tl.id === todolistId)
        if (todolistTask) {
            todolistTask.filter = value
            setTodolists([...todolists])
        }
    }

    function addTask(newTitle: string, todolistId: string) {
        let todolistTask = tasks[todolistId]
        let task = {id: v1(), title: newTitle, isDone: false}
        tasks[todolistId] = [task, ...todolistTask]
        setTasks({...tasks})
    }

    function removeTask(id: string, todolistId: string) {
        let todolistTask = tasks[todolistId]
        tasks[todolistId] = todolistTask.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTask = tasks[todolistId]
        let change = todolistTask.find(t => t.id === id)
        if (change) {
            change.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let todolistTask = tasks[todolistId]
        let change = todolistTask.find(t => t.id === id)
        if (change) {
            change.title = newTitle
            setTasks({...tasks})
        }
    }

    const todolistId1 = v1()
    const todolistId2 = v1()
    let [todolists, setTodolists] = useState<todolistsType[]>([
        {id: todolistId1, title: 'what to learn ?', filter: 'all'},
        {id: todolistId2, title: 'what to buy ?', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<tasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'html', isDone: true},
            {id: v1(), title: 'css', isDone: true},
            {id: v1(), title: 'js', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'book', isDone: false}
        ]
    })

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(tl => tl.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    function addTodolist(newTitle: string) {
        let todolist: todolistsType = {id: v1(), title: newTitle, filter: 'all'}
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasks, [todolist.id]: []
        })
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        let changeTitle = todolists.find(tl => tl.id === id)
        if (changeTitle) {
            changeTitle.title = newTitle
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemInput addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl) => {
                        let filteredTasks = tasks[tl.id]
                        if (tl.filter === 'active')
                            filteredTasks = filteredTasks.filter(t => !t.isDone)
                        if (tl.filter === 'completed')
                            filteredTasks = filteredTasks.filter(t => t.isDone)
                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                <ToDoList key={tl.id}
                                          id={tl.id}
                                          title={tl.title}
                                          tasks={filteredTasks}
                                          removeTask={removeTask}
                                          filterTask={filterTask}
                                          addTask={addTask}
                                          changeTaskStatus={changeTaskStatus}
                                          filter={tl.filter}
                                          removeTodolist={removeTodolist}
                                          changeTaskTitle={changeTaskTitle}
                                          changeTodolistTitle={changeTodolistTitle}
                                />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
