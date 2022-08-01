import React, { useEffect, useRef, useState } from "react";


//create your first component
const Home = () => {
    const [tasks, setTasks] = useState([])  //variable de estado de tipo array
    const inputRef = useRef(); // variable de estado que sirve para hacer referencia al algún punto del código

    //Segunda parte del ejercicio

    useEffect(() => {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/claudia', { method: "GET", headers: { Accept: "application/json" } })
            .then(resp => {
                if(resp.status !== 200) {
                    return [];
                }
                return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
            })
            .then(data => {
                setTasks(data)//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
                //console.log(typeof list); //esto imprimirá en la consola el objeto exacto recibido del servidor
            })
            .catch(error => {
                //manejo de errores
                console.log(error);
            });


    }, [])

    const updateTasks = (newTaskList) => fetch('https://assets.breatheco.de/apis/fake/todos/user/claudia', {
        method: "PUT",
        body: JSON.stringify(newTaskList),
        headers: {
            "Content-Type": "application/json"
        }
    })


    const onAddButtonClick = (e) => {
        e.preventDefault(); // este comando evita que 'e, que en este caso hace referencia a onSubmit, actue por defecto. Para este caso en concreto sería recargar la página cada vez que le demos a intro. 

        const taskTitle = inputRef.current.value; // guarda el valor del input.(Si solo pusieramos current imprimiría la línea de código del input)
        if (taskTitle === "") { return }

        const newTaskList = [...tasks, {label:taskTitle, done: false}];

        updateTasks(newTaskList)
            .then(data => {
                setTasks(newTaskList) //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
                console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
            })
            .catch(error => {
                //manejo de errores
                console.log(error);
            });

        inputRef.current.value = ""; // estamos diciendole que cuando ejecute la linea de arriba deje en blanco el input para volver ser usado
    };
    
    const onDeleteButtonClick = (position) => { //Función para que el botón "X" borre la task en la que se encuentra
        tasks.splice(position, 1); // Estamos diciendole que borre la tasks que se encuentre en position y que solo borre un dato. La position la obtenemos mas abajo en la función map

        updateTasks(tasks)
            .then(data => {
                setTasks([...tasks]) // Estamos diciendo que cuando ejecute splice despues nos devuelva un nuevo array con el contenido que quede en tasks
                console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
            })
            .catch(error => {
                //manejo de errores
                console.log(error);
            });
    };

    const deleteUser = () => {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/claudia', { method: "DELETE" })
            .then(() => {
                // vaciamos la lista de tareas
                setTasks([]);
            })
            .catch(error => {
                //manejo de errores
                console.log(error);
            });

    };

    const deleteAllTasks = () => {
        updateTasks([])
            .then(() => {
                // vaciamos la lista de tareas
                setTasks([]);
            })
            .catch(error => {
                //manejo de errores
                console.log(error);
            });
    }


    // Utilizamos onSubmit para que guarde las tareas dandole a intro. También podría actuar con un botón metiendolo como si fuera su hijo
    return (
        <div className="container">
            <h1>Todos</h1>
            <form onSubmit={onAddButtonClick} className="input-group mb-3">
                <input ref={inputRef} type="text" className="form-control" aria-label="Text input with segmented dropdown button" />
            </form>

            {tasks.length === 0
                ? (<span>No hay tareas, añadir tareas</span>) // la función map puedo pasarle hasta tres argumentos: el elemento actual, el index o i y un array. En este caso hemos pasado el elemento actual y la i.
                : <ul>{
                    tasks.map((taskElement, i) => {
                        return (<li key={i}>{taskElement.label} <button type="button" className="btn-close" aria-label="Delete" onClick={() => onDeleteButtonClick(i)}>&nbsp;</button></li>)
                    })
                }
                </ul>
                // llamamos a la funcion onDeleteButtonClick parandole como atributo la posición que me da map en este caso es i.
            }

            <div className="mt-2">
                <div>
                    <button type="button" className="btn btn-danger" aria-label="Delete all" onClick={deleteAllTasks}>Delete all</button>
                </div>
                <div className="mt-2">
                    <button type="button" className="btn btn-danger" aria-label="Delete all" onClick={deleteUser}>Delete user</button>
                </div>
            </div>


        </div>
    );
};

export default Home;


