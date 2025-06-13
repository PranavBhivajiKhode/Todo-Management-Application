import { useEffect, useState } from "react";
import {deleteTodoApi, retriveAllTodosForUsernameApi, } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodosComponent() {

    const [todos , setTodos] = useState([]);

    const [message , setMessage] = useState(null);

    const authContext = useAuth();

    const nevigate = useNavigate();

    const username = authContext.username;

    useEffect(() => {
        refreshTodos();
    }, []);


    function refreshTodos(){
        retriveAllTodosForUsernameApi(username)
        .then((response) => setTodos(response.data))
        .catch((error) => console.log(error))
    }

    function deleteTodo(id){
        deleteTodoApi(username,id)
        .then(
            () => {
                setMessage(`Delete of todo with id = ${id} successful`)
                refreshTodos()
            }
        )
        .catch(error => console.log(error))
    }
    
    function updateTodo(id){
        nevigate(`/todo/${id}`)
    }

    function createTodo(){
        nevigate("/todo/-1")
    }

    return (
        <div className="container">
            <h1>Things You Want To Do!</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>IS Done?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo) => (
                            <tr key={todo.id}>
                                <td>{todo.description}</td>
                                <td>{todo.done.toString()}</td>
                                <td>{todo.targetDate}</td>
                                <td className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</td>
                                <td className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</td>
                            </tr>
                        ))}
                    </tbody>
                </table>                
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={createTodo}>Add New Todo</button>
            </div>
        </div>
    )
}

export default ListTodosComponent;