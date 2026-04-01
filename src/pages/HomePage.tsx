import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Discover from '../components/Discover';
import FeaturedPlaces from '../components/FeaturedPlaces';
import About from '../components/About';
import Events from '../components/Events';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Discover />
        <FeaturedPlaces />
        <Events />
        <About />
      </main>
      <Footer />
    </>
  );
}
