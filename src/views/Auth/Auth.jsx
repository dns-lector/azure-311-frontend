import { useState } from 'react'

export default function Auth() {
  const [token, setToken] = useState(null);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const atobUtf = (str) => new TextDecoder().decode(Uint8Array.from(atob(str.replace(/\-/g, '+').replace(/\_/g, '/')), c => c.charCodeAt(0)));
  const btoaUtf = (str) => btoa(String.fromCharCode(...new TextEncoder().encode(str))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  const signInClick = () => {
    const credentials = btoaUtf(login + ':' + password);
    console.log(login, password, credentials);
    // fetch("https://pv133od0.azurewebsites.net/Cosmos/SignIn", {
    fetch("https://localhost:7224/Cosmos/SignIn", {
        headers: {
            'Authorization': 'Basic ' + credentials
        }
    }).then(r => r.json())
        .then(j => {
            if (j.status.isOk) {
                console.log(j.data);
                setToken(j.data);
                setName( JSON.parse( atobUtf(j.data.split('.')[1]) ).nam );
            }
            else {
                console.error(j);
            }
        });
  };

  const authBlock = () => <>
      <span>Login:</span><input value={login} onChange={e => setLogin(e.target.value)} />
      <br/>
      <span>Password:</span><input type='password' value={password} onChange={e => setPassword(e.target.value)} />        
      <br/>
      <button onClick={signInClick}>Sign In</button>
    </>;

  return <>
  {!token ? authBlock() : <>
    <span>Hello, {name}</span>
    <br/>
    <button onClick={() => setToken(null)}>Sign Out</button>
  </>}
    </>;
}
