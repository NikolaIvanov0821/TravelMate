import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "../../context/UserContext";

export default function Logout() {
    const { userLogoutHandler } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Logging out...");
        userLogoutHandler();
        navigate("/", { replace: true });
    }, [userLogoutHandler, navigate]);

    return <p>Logging out...</p>;
}