import { Outlet } from "react-router-dom"
import Header from "./components/header"

const body = document.getElementsByTagName('body');
body[0].style.fontFamily = 'Arial, Helvetica, sans-serif';
body[0].style.margin = 0;

function App() {
  return (
    <>  
      <Header />
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App
