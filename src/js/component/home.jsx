import React, { useEffect, useRef, useState } from "react";



//create your first component
const Home = () => {
    const [tasks, setTasks] = useState([])  
    const inputRef = useRef();


    const createList = () => {
         return fetch('https://assets.breatheco.de/apis/fake/todos/user/claudia', {
            method: "POST",
            body: JSON.stringify([]),
            headers: {
                "Content-Type": "application/json"
            }
        })

            .then(resp => {
                console.log(resp.ok); 
                console.log(resp.status); 
                return resp.json(); 
            })
            .then(data => {

                console.log(data); 
            })
            .catch(error => {
                
                console.log(error);
            });
    }

    useEffect(() => {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/claudia', { method: "GET", headers: { Accept: "application/json" } })
            .then(resp => {
                if(resp.status === 404){
                    return []
                }
                return resp.json(); 
            })
            .then(data => {
                setTasks(data)
                
            })
            .catch(error => {
                
                console.log(error);
            });
    }, [])

    const saveTasks = (tasks) => {
        if (tasks.length === 0) {
            return
        }
        return fetch('https://assets.breatheco.de/apis/fake/todos/user/claudia', {
            method: "PUT",
            body: JSON.stringify(tasks),
            headers: {
                "Content-Type": "application/json"
            }
        })

            .then(resp => {
                console.log(resp.ok); 
                console.log(resp.status); 
                return resp.json(); 
            })
            .then(data => {

                console.log(data); 
            })
            .catch(error => {
                
                console.log(error);
            });
    }

    const deleteAllTasks = (tasks) => {
        
        return fetch('https://assets.breatheco.de/apis/fake/todos/user/claudia', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

            .then(resp => {
                console.log(resp.ok); 
                console.log(resp.status); 
                return resp.json(); 
            })
            .then(data => {

                console.log(data); 
            })
            .catch(error => {
                
                console.log(error);
            });
    }

    const onDeleteButtonAll = ()=>{
        const deleteAll = setTasks([])
        deleteAllTasks(deleteAll).then(()=>{
            
        })
     }

    const onAddButtonClick = (e) => {
        e.preventDefault(); 
        
        const taskTitle = inputRef.current.value; 
        if (taskTitle === "") { return }
        const newTasks = [...tasks, { label: taskTitle, done: false }]
        if (tasks.length === 0){
            createList(taskTitle)
            .then(()=>{
                return saveTasks(newTasks)
            })
            .then(() => {
                setTasks(newTasks)
            }); 
        } else {
            saveTasks(newTasks).then(() => {
                setTasks(newTasks)
            }); 
        }
        inputRef.current.value = ""; 
    }
    const onDeleteButtonClick = (position) => {
        if (tasks.length ===1){
            deleteAllTasks().then(()=> setTasks([]))
        }else{
        tasks.splice(position, 1);
        saveTasks(tasks).then(() => {
            setTasks([...tasks])
        })};
    }
    

    return (<>
        <div className="container">
            <h1>¿Qué hacemos esta semana?</h1>
            <form onSubmit={onAddButtonClick} className="input-group mb-3">
                <input ref={inputRef} type="text" className="form-control" aria-label="Text input with segmented dropdown button" />
            </form>

            {tasks.length === 0
                ? (<span>No hay tareas, añadir tareas</span>)
                : <div>
                    <ul>{
                        tasks.map((taskElement, i) => {
                            return (<li key={i}>{taskElement.label} <button type="button" className="fa-regular fa-trash-can btn-delete" aria-label="Delete" onClick={() => onDeleteButtonClick(i)}></button></li>
                            )
                        })
                    }
                    </ul>
                    <button type="button" className="btn-dlt-all border rounded" aria-label="Delete" onClick={() => onDeleteButtonAll()}>Borrar todo</button>
                </div>
            }


        </div>
    </>
    );
};

export default Home;


