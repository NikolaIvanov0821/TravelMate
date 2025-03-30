import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLogin } from "../../api/authHook";
import "./Login.css";


export default function Login() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useLogin();

    const loginHandler = async (formData) => {
        const { email, password } = Object.fromEntries(formData);

        try {
            const userData = await login({ email, password });
            console.log(userData);
            if (!userData || userData.message) {
                throw new Error(userData.message || "Invalid email or password");
            }
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/')
        } catch (error) {
            setError(error.message);
            setTimeout(() => setError(null), 3000);
            return;
        }
    }

    return (
        <>
            <div className="login-container">
                <h2>Login</h2>
                <form action={loginHandler}>
                    {error && <p className="error-message">{error}</p>} 

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        //value={formData.email}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        //value={formData.password}
                        required
                    />

                    <button type="submit" className="login-button">Sign in</button>
                    <div>
                        <span>Don't have an account? Click <Link to="/register">here</Link></span>
                    </div>
                </form>
            </div>
        </>
    );
}