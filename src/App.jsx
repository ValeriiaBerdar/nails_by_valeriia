import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import AdditionalServices from "./components/AdditionalServices";
import Gallery from "./components/Gallery";
import BookingForm from "./components/BookingForm";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Services />
        <AdditionalServices />
        <Gallery />
        <BookingForm />
        <Contacts />
      </main>

      <Footer />
    </>
  );
}

export default App;
