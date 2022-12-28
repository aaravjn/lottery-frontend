import { useState } from "react"

export default function useToken() {

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userCredentials = localStorage.getItem('userCredentials')
        const userToken = JSON.parse(tokenString);
        return [userToken, userCredentials]
    };

    const [, setToken] = useState(getToken())

    const saveToken = (userToken, userCredentials) => {
        localStorage.setItem('userCredentials', JSON.stringify(userCredentials))
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    return {
        saveToken: saveToken,
        getToken: getToken
    }
}