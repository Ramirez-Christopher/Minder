import { useState } from 'react';
import api from "../api";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants";
import { useNavigate } from 'react-router-dom';
import "../styles/Forms.css";

function Form({route, method}) {
    const [username, SetUserName] = useState("");
    const [password, SetPassword] = useState("");
    const [loading, SetLoading] = useState(false);
    const navigate = useNavigate();

    const name = method == "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        SetLoading(true);
        e.preventDefault();

        try{
            const res = await api.post(route, { username, password});
            if (method == "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        }
        catch(error) {
            alert(error);
            SetLoading(false);
        } finally {
            SetLoading(false);
        }


    };


    return <form  onSubmit={handleSubmit} className='form-container'>
        <h1>{name}</h1>
        <input
            className='form-input'
            type="text"
            value={username}
            onChange={(e) => SetUserName(e.target.value)}
            placeholder="Username"
        />

        <input
            className='form-input'
            type="password"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
            placeholder="Password"
        />

        <button className='form-button' type="submit">
            {name}
        </button>
    </form>
}

export default Form;