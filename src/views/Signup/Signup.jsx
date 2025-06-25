import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        setStatus(name.length > 0 && login.length > 0 && password.length > 0 && password == repeatPassword);
    };

    useEffect(validateForm, [name, login, password, repeatPassword]);

    const onFormSubmit = e => {
        e.preventDefault();
        console.log("submit");
        const formData = new FormData();
        formData.append("user-name", name);
        formData.append("user-login", login);
        formData.append("user-password", password);
        formData.append("user-repeat", repeatPassword);
 
        fetch("https://pv133od0.azurewebsites.net/Cosmos/SignUp", {
            method: 'POST',
            body: formData
        }).then(r => r.json())
            .then(j => {
                if (j.status.isOk) {
                    console.log(j.data);
                    navigate("/");
                }
                else {
                    console.error(j);
                }
            });
    }

    return <>
        <h1>Sign Up</h1>
        <form onSubmit={onFormSubmit}>
            <div className="input-group mb-3">
                <span className="input-group-text" id="name-addon"><i className="bi bi-person"></i></span>
                <input name="user-name" type="text" className="form-control" placeholder="Ім'я" 
                    aria-label="Ім'я" aria-describedby="name-addon"
                    value={name} onChange={e => {setName(e.target.value); }}/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="login-addon"><i className="bi bi-person"></i></span>
                <input name="user-login" type="text" className="form-control" placeholder="Логін"
                    aria-label="Логін" aria-describedby="login-addon"
                    value={login} onChange={e => {setLogin(e.target.value); }}/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="password-addon"><i className="bi bi-person"></i></span>
                <input name="user-password" type="password" className="form-control" placeholder="****"
                    aria-label="Пароль" aria-describedby="password-addon"
                    value={password} onChange={e => {setPassword(e.target.value); }}/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="repeat-addon"><i className="bi bi-person"></i></span>
                <input name="user-repeat" type="password" className="form-control" placeholder="****"
                    aria-label="Повтор паролю" aria-describedby="repeat-addon"
                    value={repeatPassword} onChange={e => {setRepeatPassword(e.target.value); }}/>
            </div>
            {status ? 
            <button type="submit" className="btn btn-primary">Реєстрація</button>
            : <button type="button" className="btn btn-secondary">Заповніть форму</button>}
        </form>
    </>;
}