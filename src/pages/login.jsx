import { auth } from "../server";
import { useState } from "react";
import axios from "axios";
import { useAppContext } from "../component/context";
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    axios.defaults.withCredentials = true
    const { state, dispatch } = useAppContext();
    const go = useNavigate();


    async function login(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${auth}/login`, { email, password });
            dispatch({ type: 'SET_USER', payload: data });
            alert(`Welcome ${data.user}`);
            go('/');
        } catch (error) {
            alert(error.response.data.msg);
        }
    }


    return (
        <div className="login">
            <section className="login-center">
                <h1>Login</h1>
                <form action="" onSubmit={login}>
                    <div>
                        <input
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button>Login</button>
                    <div className="already-registered">
                        <div >
                            <small>Don't have an Account?</small>
                            <small onClick={() => go('/register')}>Sign Up</small>
                        </div>
                        {/* <small>Forget Password</small> */}
                    </div>
                </form>
            </section>
        </div>
    )
}