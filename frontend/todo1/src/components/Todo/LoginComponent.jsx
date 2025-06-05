import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

function LoginComponent() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const nevigate = useNavigate();
    const authContext = useAuth();

    function handleUsernameChange(event) {
        const name = event.target.value;
        setUsername(name);
    }

    function handlePasswordChange(event) {
        const pass = event.target.value;
        setPassword(pass);
    }

    function handleSubmit() {
        if (authContext.login(username, password)) {            
            nevigate(`/welcome/${username}`);
        } else {
            setShowErrorMessage(true);
        }
    }

    return (
        <div className="Login">
            <div className="LoginForm">
                <h1>Time to Login!</h1>
                {showSuccessMessage && <div className="successMessage">Authentication Successfull</div>}
                {showErrorMessage && <div className="errorMessage">Failed Authentication. Please check your credentials.</div>}
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" placeholder="Enter Your Name" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;