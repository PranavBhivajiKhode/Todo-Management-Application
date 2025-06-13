import { createContext, useContext, useState } from "react";
import { executeBasicAuthenticationService } from "../api/HelloWorldApiService";
import { apiClient } from "../api/apiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  // async function login(username, password) {
  //   const baToken = "Basic " + window.btoa(username + ":" + password);

  //   try {
  //     const response = await executeBasicAuthenticationService(baToken);

  //     if (response.status === 200) {
  //       setAuthenticated(true);
  //       setUsername(username);
  //       setToken(baToken);

  //       apiClient.interceptors.request.use(
  //         (config) =>{
  //           console.log('Intercepting and adding a token');
  //           config.headers.Authorization = baToken;
  //           return config;
            
  //         }
  //       )

  //       return true;
  //     } else {
  //       setAuthenticated(false);
  //       setUsername(null);
  //       setToken(null);
  //       return false;
  //     }
  //   } catch (error) {
  //     setAuthenticated(false);
  //     setUsername(null);
  //     setToken(null);
  //     return false;
  //   }
  // }

  async function login(username, password) {
    try {
      const response = await executeJwtAuthenticationService(username,password);

      if (response.status === 200) {

        const jwtToken = 'Bearer ' + response.data.token;

        setAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);

        apiClient.interceptors.request.use(
          (config) =>{
            console.log('Intercepting and adding a token');
            config.headers.Authorization = jwtToken;
            return config;
            
          }
        )

        return true;
      } else {
        setAuthenticated(false);
        setUsername(null);
        setToken(null);
        return false;
      }
    } catch (error) {
      setAuthenticated(false);
      setUsername(null);
      setToken(null);
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
    setUsername(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated, login, logout, username, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
