import { BrowserRouter } from 'react-router'
import Navbar from './componentes/Menu/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
 
export default function App() {
  return (
    <>
     <BrowserRouter>
     <Navbar/>
     <div className="container">
     </div>
     </BrowserRouter>
    </>
  )
}

