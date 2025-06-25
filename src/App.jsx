
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Auth from "./views/Auth/Auth";
import Layout from "./views/Layout/Layout";
import Signup from "./views/Signup/Signup";

function App() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Auth />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>;
}

export default App
