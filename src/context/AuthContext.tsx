// import {jwtDecode} from 'jwt-decode';


// import { createContext, useEffect, useState, type PropsWithChildren } from "react";

// export let AuthContext = createContext(null);

// export default function AuthContextProvider(props: PropsWithChildren) {
//     const [loginData, setloginData] = useState(null);

//     const saveLoginData = () => {
//         let encodedToken = localStorage.getItem("accessToken");
//         if (encodedToken) {
//             let decodedToken = jwtDecode(encodedToken);
//             console.log(decodedToken);
//             setloginData(decodedToken);
//         }
//     };
//     useEffect(()=>{
//         if(localStorage.getItem('accessToken'))
//             saveLoginData()
    

//     },[]);
//     const logout = () => {
//     localStorage.removeItem("accessToken"); 
//     setloginData(null);
//     window.location.href = "/login"; 
// };

   

//     return (
//         <AuthContext.Provider value={{ saveLoginData , loginData,logout }}>
//             {props.children}
//         </AuthContext.Provider>
//     );
// }
import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState, type PropsWithChildren } from "react";

// تعريف الـ Context مع قيم افتراضية عشان TypeScript ميزعلش
export let AuthContext = createContext<any>(null);

export default function AuthContextProvider(props: PropsWithChildren) {
    const [loginData, setloginData] = useState(null);

    const saveLoginData = () => {
        let encodedToken = localStorage.getItem("accessToken");
        
        // 1. التأكد إن فيه توكن فعلاً
        // 2. التأكد إن التوكن فيه 3 أجزاء (Header.Payload.Signature) عشان jwtDecode ميعملش Crash
        if (encodedToken && encodedToken.split('.').length === 3) {
            try {
                let decodedToken = jwtDecode(encodedToken);
                console.log("Decoded Success:", decodedToken);
                setloginData(decodedToken);
            } catch (error) {
                // لو التوكن بايظ أو منتهي الصلاحية
                console.error("Invalid Token Format:", error);
                logout(); 
            }
        } else {
            // لو التوكن مش موجود أو مش JWT سليم
            setloginData(null);
        }
    };

    useEffect(() => {
        // بننادي الدالة وهي جواها الـ check بتاعها
        saveLoginData();
    }, []);

    const logout = () => {
        localStorage.removeItem("accessToken"); 
        setloginData(null);
        // الأفضل نستخدم navigate لو متاح، بس window.location شغالة برضه
        window.location.href = "/login"; 
    };

    return (
        <AuthContext.Provider value={{ saveLoginData, loginData, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
}
