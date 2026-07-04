import { jwtDecode } from 'jwt-decode';
import { createContext,  useState, useCallback, type PropsWithChildren } from "react";

// تعريف الـ Context
export const AuthContext = createContext<any>(null);

export default function AuthContextProvider(props: PropsWithChildren) {
    const [loginData, setloginData] = useState<any>(() => {
        const encodedToken = localStorage.getItem("accessToken");
        if (!encodedToken) return null;

        try {
            return jwtDecode(encodedToken);
        } catch {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userRole");
            return null;
        }
    });

    const logout = useCallback(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userRole"); // حذف الدور عند تسجيل الخروج
        setloginData(null);
        window.location.href = "/login";
    }, []);

    const saveLoginData = useCallback(() => {
        const encodedToken = localStorage.getItem("accessToken");
        if (encodedToken) {
            try {
                const decodedToken = jwtDecode(encodedToken);
                setloginData(decodedToken);
            } catch (error) {
                logout();
            }
        }
    }, [logout]);

    return (
        <AuthContext.Provider value={{ saveLoginData, loginData, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
}