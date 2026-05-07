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
// import { Navigate } from "react-router-dom";
// import { jwtDecode } from 'jwt-decode';

// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
//     const token = localStorage.getItem('accessToken');

//     if (!token || token === "undefined") {
//         return <Navigate to="/login" replace />;
//     }

//     try {
        
//         const decoded: any = jwtDecode(token);
        
     
//         if (decoded) {
//             return <>{children}</>;
//         }
//     } catch (error) {
        
//         localStorage.removeItem('accessToken');
//         return <Navigate to="/login" replace />;
//     }

//     return <Navigate to="/login" replace />;
// }
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Box } from "@mui/material";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const verifyToken = async () => {
            // 1. لو مفيش توكن أصلاً، ارفضي الدخول فوراً
            if (!token || token === "undefined") {
                setIsAuth(false);
                return;
            }

            try {
                // 2. اطلبي من السيرفر يتأكد من التوكن (استخدام الـ test-auth اللي في الصورة)
                const res = await axios.get("https://credithourssystemw.premiumasp.net/api/Password/test-auth", {
                    headers: { 
                        Authorization: `Bearer ${token}` 
                    }
                });

                // 3. لو السيرفر رد بـ true (زي ما في الصورة) يبقى تمام
                if (res.data.isAuthenticated) {
                    setIsAuth(true);
                } else {
                    setIsAuth(false);
                }
            } catch (error) {
                // لو السيرفر رد بـ 401 أو حصلت مشكلة، امسحي التوكن البايظ
                console.error("Auth failed:", error);
                localStorage.removeItem('accessToken');
                setIsAuth(false);
            }
        };

        verifyToken();
    }, [token]);

    // 4. حالة التحميل (عشان ميعملش Redirect قبل ما السيرفر يرد)
    if (isAuth === null) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress color="primary" />
            </Box>
        );
    }

    // 5. القرار النهائي
    return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
}