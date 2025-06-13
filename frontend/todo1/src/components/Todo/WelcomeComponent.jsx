import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import {retriveHelloWorldPathVariable } from "./api/HelloWorldApiService";
import { useAuth } from "./security/AuthContext";

function WelcomeComponent() {

    const { username } = useParams();

    const [message , setMessage] = useState(null);

    const authContext = useAuth();

    function handleHelloWorld(){
        retriveHelloWorldPathVariable(username)
        .then((success) => successMessage(success))
        .catch((error) => errorMessage(error))
        .finally("cleanup")
    }

    function successMessage(success){
        console.log(success);
        setMessage(success.data.message)
    }

    function errorMessage(error){
        console.log(error);
    }

    return (
        <div className="Welcome">
            <h1>Welcome {username}</h1>
            <div >
                Manage your todos- <Link to="/todos">go here</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={handleHelloWorld}>hello world</button>
            </div>
            <div className="text-info ">{message}</div>
        </div>
    )
}

export default WelcomeComponent;