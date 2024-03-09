import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useEffect } from 'react'
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
    const { auth, setAuth } = useAuth();
    const location = useLocation();

    
    if (!auth.isLoggedIn) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export default RequireAuth;



