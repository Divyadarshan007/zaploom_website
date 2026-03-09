import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Feature from "./pages/Feature"
import Customized from "./pages/Customized"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Products from "./pages/Products"

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Feature />} />
            <Route path="/customized" element={<Customized />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App