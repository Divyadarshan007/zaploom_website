import Feature from "./Feature"
import Hero from "./Hero"
import Portfolio from "./Portfolio"
import Team from "./Team"
import Testimonial from "./Testimonial"
import Footer from "../components/Footer"

const Home = () => {
    return (
        <>
            <Hero />
            <Feature />
            <Portfolio />
            <Testimonial />
            <Team />
            <Footer />
        </>
    )
}

export default Home
