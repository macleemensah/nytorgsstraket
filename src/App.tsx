import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Discover from './components/Discover';
import FeaturedPlaces from './components/FeaturedPlaces';
import Events from './components/Events';
import ExploreStreet from './components/ExploreStreet';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-bg-paper">
      <Navbar />
      <main>
        <Hero />
        <Discover />
        <FeaturedPlaces />
        <Events />
        <ExploreStreet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
