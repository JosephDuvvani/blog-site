import { Outlet } from "react-router-dom"
import Header from "./components/header"
import { createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const body = document.getElementsByTagName('body');
body[0].style.fontFamily = 'Arial, Helvetica, sans-serif';
body[0].style.margin = 0;

export const AuthContext = createContext({});

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const cookies = new Cookies(null, {path: '/'});

    const token = cookies.get('jwt-refresh-blog');
    
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser}}>  
      <Header />
      <div>
        <Outlet />
      </div>
    </AuthContext.Provider>
  )
}

export default App
