import Navbar from "../components/Navbar";
import PagePreview from "../components/PagePreview";
import Portfolio from "../components/Portfolio";
import About from "../components/About";
import Contact from "../components/Contact";
import Popup from "../components/Popup";

function Home() {
  return (
    <>
    <Popup />
      <Navbar />
      <PagePreview />
      <Portfolio />
      <About />
      <Contact />
    </>
  );
}

export default Home;