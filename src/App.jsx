
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Auth from "./views/Auth/Auth";
import Layout from "./views/Layout/Layout";
import Signup from "./views/Signup/Signup";
import { AppContext } from "./context/AppContext";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  const request = (url, ini) => {
    if(url.startsWith('/')) {
      // url = "https://pv133od0.azurewebsites.net" + url;
      url = "https://localhost:7224" + url;
    }
    if(user != null) {
      if(typeof ini == 'undefined') {
        ini = {};
      }
      if(typeof ini.headers == 'undefined') {
        ini.headers = {};
      }
      if(typeof ini.headers['Authorization'] == 'undefined') {
        ini.headers['Authorization'] = "Bearer " + user.token;
      }
    }

    return new Promise((resolve, reject) => {
      fetch(url, ini).then(r => r.json()).then(j => {
        if (j.status.isOk) {
          resolve(j.data);
        }
        else {
          console.error(j);
          reject(j);
        }
      });
    }) 
  };

  return <AppContext.Provider value={ { user, setUser, request } } > 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Auth />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppContext.Provider>;
}

export default App
