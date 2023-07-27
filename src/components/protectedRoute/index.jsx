import React, { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const ProtectedRoute = () => {
	const { user, loading } = useAuth();
	const location = useLocation();

	if (!loading) {
		return user ? (
			<Outlet />
		) : (
			<Navigate to={"/login"} replace state={{ path: location.pathname }} />
		);
	}
};

export default ProtectedRoute;
