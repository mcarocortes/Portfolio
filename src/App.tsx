import { BrowserRouter } from 'react-router'
import Navbar from './componentes/Menu/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Hero from './componentes/Hero/Hero';
 

export default function App() {
  return (
    <>
     <BrowserRouter>
     <Navbar/>
     <Hero />
     <div className="container">
     </div>
     </BrowserRouter>
    </>
  )
}

