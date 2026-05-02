// import { useContext } from "react";
// import { AuthContext } from "../../../../context/AuthContext";
// import { Navigate } from "react-router-dom";



// export default function ProtectedRoute(props:any) {
//     let{loginData} = useContext(AuthContext)
//     if(localStorage.getItem('accessToken') || loginData){
//         return props.children ;
//     }
//     else{
//         return <Navigate to={'/'}/>
//     }
 
// }
// ProtectedRoute.tsx
// import { useContext } from "react";
// import { AuthContext } from "../../../../context/AuthContext";
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute(props: any) {
//     let { loginData } = useContext(AuthContext);
    
 
//     const isAuthenticated = localStorage.getItem('accessToken') || loginData;

//     if (isAuthenticated) {
//         return props.children;
//     } else {
      
//         return <Navigate to={'/login'} />;
//     }
// }
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute(props: any) {

//     const token = localStorage.getItem('accessToken');

//     if (token) {
     
//         return props.children;
//     } else {
      
//         return <Navigate to="/login" replace />;
//     }
// 
import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem('accessToken');

    if (!token || token === "undefined") {
        return <Navigate to="/login" replace />;
    }

    try {
        
        const decoded: any = jwtDecode(token);
        
     
        if (decoded) {
            return <>{children}</>;
        }
    } catch (error) {
        
        localStorage.removeItem('accessToken');
        return <Navigate to="/login" replace />;
    }

    return <Navigate to="/login" replace />;
}