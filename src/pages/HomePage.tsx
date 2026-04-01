import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Discover from '../components/Discover';
import FeaturedPlaces from '../components/FeaturedPlaces';
import Events from '../components/Events';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Discover />
        <FeaturedPlaces />
        <Events />
      </main>
      <Footer />
    </>
  );
}
