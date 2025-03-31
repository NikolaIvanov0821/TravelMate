import { useState } from "react";
import { useRegister } from "../../api/authHook";
import "./Register.css"
import { Link, useNavigate } from "react-router";
import { useUserContext } from "../../context/UserContext";

export default function Register() {
    const [error, setError] = useState(null);
    const { register } = useRegister();
    const navigate = useNavigate();
    const { userLoginHandler } = useUserContext();

    const registerhandler = async (formData) => {
        const { username, phone, email, password, repassword } = Object.fromEntries(formData);
        
        if (repassword !== password) {
            setError('Password mismatch!');
            setTimeout(() => setError(null), 3000);
            return;
        }

        try {
            const userData = await register({ username, phone, email, password, repassword });
            console.log(userData.message);
            if (!userData || userData.message) {
                throw new Error(userData.message || "Invalid email or password");
            }
            userLoginHandler(userData);
            navigate('/');
        } catch (error) {
            setError(error.message);
            setTimeout(() => setError(null), 3000);
            return;
        }
        
    }

    return (
        <>
            <div className="register-container">
                <h2>Register</h2>
                <form action={registerhandler}>
                    {error && <p className="error-message">{error}</p>} 

                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        //value={formData.username}
                        required
                    />

                    <label htmlFor="phone">Phone number: </label>
                    <input
                        type="phone"
                        name="phone"
                    //value={formData.phone}
                    />

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

                    <label htmlFor="repassword">Re-Password:</label>
                    <input
                        type="password"
                        name="repassword"
                        //value={formData.repassword}
                        required
                    />

                    <button type="submit" className="register-button">Sign Up</button>
                    <div>
                        <span>Already have an account? Click <Link to="/login">here</Link></span>
                    </div>
                </form>
            </div>
        </>
    );
}