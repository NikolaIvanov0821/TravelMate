import { UserContext } from "../context/UserContext";
import usePersistedState from "../hooks/usePersistedState";

export default function UserProvider({
    children,
}) {
    const [authData, setAuthData] = usePersistedState('auth', {});

    const userLoginHandler = (resultData) => {
        setAuthData(resultData);
    };

    const userLogoutHandler = () => {
        console.log("Logging out...");
        setAuthData(null); 
        localStorage.removeItem("auth");
        console.log("Auth data should be cleared:", localStorage.getItem("auth"));
    };

    return (
        <UserContext.Provider value={{ ...authData, userLoginHandler, userLogoutHandler }}>
            {children}
        </UserContext.Provider>
    );
}