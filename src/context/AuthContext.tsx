import {jwtDecode} from 'jwt-decode';


import { createContext, useEffect, useState, type PropsWithChildren } from "react";

export let AuthContext = createContext(null);

export default function AuthContextProvider(props: PropsWithChildren) {
    const [loginData, setloginData] = useState(null);

    const saveLoginData = () => {
        let encodedToken = localStorage.getItem("accessToken");
        if (encodedToken) {
            let decodedToken = jwtDecode(encodedToken);
            console.log(decodedToken);
            setloginData(decodedToken);
        }
    };
    useEffect(()=>{
        if(localStorage.getItem('accessToken'))
            saveLoginData()
    

    },[]);
    const logout = () => {
    localStorage.removeItem("accessToken"); 
    setloginData(null);
    window.location.href = "/login"; 
};

   

    return (
        <AuthContext.Provider value={{ saveLoginData , loginData,logout }}>
            {props.children}
        </AuthContext.Provider>
    );
}

