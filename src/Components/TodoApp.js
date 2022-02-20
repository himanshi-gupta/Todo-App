import React,{useState,useRef,useEffect} from 'react'
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
    const [currentTask,setCurrentTask]=useState('')
    const inputTask=useRef(null)

    const AddTask=()=>{
        setTodoList([...todoList,{title:currentTask,completed:false}])
        inputTask.current.value="";
        setCurrentTask("");
    };

    const ClearAllTask=()=>{
        setTodoList([])
        inputTask.current.value="";
        setCurrentTask("");
    }

    const deleteTask=(taskToDelete)=>{
        setTodoList(todoList.filter((task)=>{
            return task.title!==taskToDelete.title;
        }))
    };

    const completeTask=(taskToComplete)=>{
        setTodoList(todoList.map((task)=>{
            return (taskToComplete.title===task.title ? {title:taskToComplete.title,completed:true} 
            : {title:task.title, completed:task.completed ? true :false }
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
                <input type="text" onKeyDown={(event)=>{if(event.keyCode===13) AddTask()}} placeholder="Task.." ref={inputTask} onChange={(event)=>setCurrentTask(event.target.value)}/>
                <button onClick={AddTask}>Add Task</button>
                <button onClick={ClearAllTask}>Clear All Tasks</button>
            </div>
            <hr/>
            <div>
                <ul>
                {todoList.map((task,key)=>{
                    return ( 
                    <div id="task">
                        <li key={key}>{task.title}</li>
                        &nbsp; &nbsp;
                        <FaEdit color='green' size={30}/>
                        &nbsp; &nbsp;
                        <MdDelete onClick={()=>deleteTask(task)} size={30}/>
                        &nbsp; &nbsp;
                        {task.completed ? <h2><MdOutlineDoneOutline color='green' size={30}/></h2> : <h2><MdOutlineErrorOutline color='red' size={30} onClick={()=>completeTask(task)}/></h2>}
                    </div>)

                })}
                </ul>
            </div>
        </div>
    )
}

export default TodoApp