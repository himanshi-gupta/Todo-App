import React,{useState,useEffect} from 'react'
import {MdDelete, MdOutlineDoneOutline, MdOutlineErrorOutline} from 'react-icons/md'
import {FaEdit} from 'react-icons/fa'
import checklist_homepage from '../checklist_homepage.png'
import './TodoApp.css'

// To get the data from local storage
const getLocalList = () =>{
    let list=localStorage.getItem('ToDoList');
    if(list)
        return JSON.parse(localStorage.getItem('ToDoList'));
    else
        return [];
}

function TodoApp(){
    var [todoList,setTodoList]=useState(getLocalList())
    const [currentTask,setCurrentTask]=useState('');
    const [toggleEdit,setToggleEdit]=useState(true);
    const [isEditTask,setIsEditTask]=useState(null);

    const AddTask=()=>{
        if(!currentTask)
            alert("Please add task!")
        else if(currentTask && !toggleEdit){
            setTodoList(
                todoList.map((task)=>{
                    if(task.id===isEditTask){
                        return {...task,title:currentTask}
                    }
                    return task;
                })
            )
            setToggleEdit(true);
            setCurrentTask('')
        }
        else{
            setTodoList([...todoList,{id : new Date().getTime().toString(),title:currentTask,completed:false}])
            setCurrentTask('');
        }
    };

    const clearAllTask=()=>{
        setTodoList([])
        setCurrentTask('');
    }

    const editTask=(taskToEditId)=>{
        let editItem=todoList.find((task) => {
            return taskToEditId===task.id
        })
        setToggleEdit(false);
        setCurrentTask(editItem.title)
        setIsEditTask(taskToEditId);
    }

    const deleteTask=(taskToDeleteID)=>{
        setTodoList(todoList.filter((task)=>{
            return taskToDeleteID!==task.id;
        }))
    };

    const completeTask=(taskToCompleteID)=>{
        setTodoList(todoList.map((task)=>{
            return (taskToCompleteID===task.id ? {...task,completed:!task.completed} 
            : {...task}
            ) }))
    }


    // Add data to local storage
    useEffect(()=>{
        localStorage.setItem("ToDoList",JSON.stringify(todoList))
    },[ todoList ])

    return(
        <div>
            <div> 
            <p/><img src={checklist_homepage} width={55} height={70} alt="Logo" />
            <h1>Todo-App</h1>
                <input type="text" onKeyDown={(event)=>{if(event.keyCode===13) AddTask()}} placeholder="Add your task..." value={currentTask} onChange={(event)=>setCurrentTask(event.target.value)}/>
                {toggleEdit ? <button onClick={AddTask}>Add Task</button> : <button onClick={AddTask}>Save Task</button> }
                <button onClick={clearAllTask}>Clear All Tasks</button>
            </div>
            <hr/>
            <div>
                <ul>
                {todoList.map((task)=>{
                    return ( 
                    <div id="task">
                        <li key={task.id}>{task.title}</li>
                        &nbsp; &nbsp;
                        <FaEdit onClick={()=>editTask(task.id)} color='green' size={30}/>
                        &nbsp; &nbsp;
                        <MdDelete onClick={()=>deleteTask(task.id)} size={30}/>
                        &nbsp; &nbsp;
                        {task.completed ? <h2><MdOutlineDoneOutline color='green' size={30} onClick={()=>completeTask(task.id)} /></h2> : <h2><MdOutlineErrorOutline color='red' size={30} onClick={()=>completeTask(task.id)}/></h2>}
                    </div>)

                })}
                </ul>
            </div>
        </div>
    )
}

export default TodoApp