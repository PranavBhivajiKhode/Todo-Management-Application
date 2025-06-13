import { apiClient } from "./apiClient";

export const retriveHelloWorldBean = () => apiClient.get("/hello-world-bean");

export const retriveHelloWorldPathVariable = (username) => apiClient.get(`/hello-world/path-variable/${username}`,);


    