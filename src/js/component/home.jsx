import React, { useEffect, useRef, useState } from "react";



//create your first component
const Home = () => {
    const [tasks, setTasks] = useState([])  //variable de estado de tipo array
    const inputRef = useRef(); // variable de estado que sirve para hacer referencia al algún punto del código

    //Segunda parte del ejercicio

    useEffect(() => {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/claudia', { method: "GET", headers: { Accept: "application/json" } })
            .then(resp => {

                return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
            })
            .then(data => {
                const list = data;
                setTasks(list)//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
                //console.log(typeof list); //esto imprimirá en la consola el objeto exacto recibido del servidor
            })
            .catch(error => {
                //manejo de errores
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
                console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
                console.log(resp.status); // el código de estado = 200 o código = 400 etc.
                return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
            })
            .then(data => {

                console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
            })
            .catch(error => {
                //manejo de errores
                console.log(error);
            });
    }

    const onAddButtonClick = (e) => {
        e.preventDefault(); // este comando evita que 'e, que en este caso hace referencia a onSubmit, actue por defecto. Para este caso en concreto sería recargar la página cada vez que le demos a intro. 

        const taskTitle = inputRef.current.value; // guarda el valor del input.(Si solo pusieramos current imprimiría la línea de código del input)
        if (taskTitle === "") { return }
        const newTasks = [...tasks, { label: taskTitle, done: false }]
        saveTasks(newTasks).then(() => {
            setTasks(newTasks)
        }); // Estamos diciendole que setTasks cree un nuevo array donde meta todo lo que hay dentro de tasks (...tasks) más el nuevo contenido del input(taskTitle).
        inputRef.current.value = ""; // estamos diciendole que cuando ejecute la linea de arriba deje en blanco el input para volver ser usado
    }
    const onDeleteButtonClick = (position) => {
        tasks.splice(position, 1);
        saveTasks(tasks).then(() => {
            setTasks([...tasks])
        });
    }

    return (<>
        <div className="container">
            <h1>Todos</h1>
            <form onSubmit={onAddButtonClick} className="input-group mb-3">
                <input ref={inputRef} type="text" className="form-control" aria-label="Text input with segmented dropdown button" />
            </form>

            {tasks.length === 0
                ? (<span>No hay tareas, añadir tareas</span>)
                : <div>
                    <ul>{
                        tasks.map((taskElement, i) => {
                            return (<li key={i}>{taskElement.label} <button type="button" className="btn-close" aria-label="Delete" onClick={() => onDeleteButtonClick(i)}></button></li>
                            )
                        })
                    }
                    </ul>
                    <button type="button" className="" aria-label="Delete" onClick={() => onDeleteButtonAll()}>Borrar todo</button>
                </div>
            }


        </div>
    </>
    );
};

export default Home;


