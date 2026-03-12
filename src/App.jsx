import { Suspense, lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const Home = lazy(() => import("./pages/Home"))
const Feature = lazy(() => import("./pages/Feature"))
const Customized = lazy(() => import("./pages/Customized"))
const Contact = lazy(() => import("./pages/Contact"))
const About = lazy(() => import("./pages/About"))
const Products = lazy(() => import("./pages/Products"))
const ProductDetail = lazy(() => import("./pages/ProductDetail"))
const Blog = lazy(() => import("./pages/Blog"))
const MoreAboutBlog = lazy(() => import("./pages/MoreAboutBlog"))

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
  </div>
)

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <BrowserRouter>
        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Feature />} />
              <Route path="/customized" element={<Customized />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/blogs" element={<Blog />} />
              <Route path="/blogs/:slug" element={<MoreAboutBlog />} />
            </Routes>
          </Suspense>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App