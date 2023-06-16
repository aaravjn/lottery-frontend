import Home from './pages/Home';  
import Login from "./components/Login"
import About from "./pages/About"
import { Routes, Route} from "react-router-dom";
import React from "react"
import useToken from './useToken';

function App() {
  const { getToken, saveToken } = useToken()
  const [token, userCredentials] = getToken()

  const user = JSON.parse(userCredentials)
  
  if(!token) {
    return <Login setToken={saveToken} />
  }
  
  return (
    <div className="app">
    <Routes>
      <Route path="/" element={<Home username={user["username"]} email={user["email"]} />} />
      <Route path="/About" element={<About username={user["username"]}/>} />
    </Routes>
    </div>
  );
}

export default App;