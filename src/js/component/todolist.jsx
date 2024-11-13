import React, { useEffect, useState } from "react";


export const ToDoList = () => {

    const [todo, setTodo] = useState('');
    const [username, setUsername] = useState('marcos');
    const [userdata, setUserdata] = useState({});
    const url = 'https://playground.4geeks.com/todo'

    useEffect(() => {
        createUser()
        getData()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch(url + '/todos/' + username, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ label: todo, is_done: false })
            });
            if (!response.ok) throw new Error('algo ha fallado añadiendo la tarea')
            const data = await response.json();
            getData()
            setTodo('')

        }
        catch (error) { console.log(error) };


    }

    const handleToDo = (e) => setTodo(e.target.value)

    const getData = async () => {
        try {
            const resp = await fetch(url + '/users/' + username);
            if (!resp.ok) throw new Error('something wrong obtaining data')
            const data = await resp.json();
            console.log(data)
            setUserdata(data);
        }
        catch (error) { console.log(error) };
    }

    const createUser = async () => {
        try {
            const response = await fetch(url + '/users/'+ username, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
            });
            if (!response.ok) throw new Error('algo ha fallado creando usuario')
            const data = await response.json();
            getData()
        }
        catch (error) { console.log(error) };
    }

    const handleDelete = async (todo_id) => {
        try {
            const response = await fetch(url + '/todos/'+ todo_id, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('algo ha fallado creando usuario')
                getData()
        }
        catch (error) { console.log(error) };
    }


    return (
        <div className="container text-center wrapper">
            <h1 className="mb-5 pt-3">The To Do List</h1>
            <form className="input-box" onSubmit={handleSubmit}>
                <input type="text" value={todo} onChange={handleToDo} placeholder="What needs to be done?" />
            </form>
            <ul className="notMarkers">
            {userdata.todos?.map((el) => <li className="pt-3 li-box d-flex justify-content-between" key={el.id}>{el.label}<i className="fa-solid fa-trash" onClick={() => handleDelete(el.id)}></i></li>)}    
            </ul>
            <div className="container text-center pt-3">{userdata.length} items left</div>
        </div>
    )
}
