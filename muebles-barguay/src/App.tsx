import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ContactForm from './components/ContactForm';
import EmployeeList from './components/EmployeeList';
import PokemonApi from './components/PokemonApi';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <LandingPage />
              <div className="container">
                <ContactForm />
              </div>
            </>
          } />
          <Route path="/empleados" element={<EmployeeList />} />
          <Route path="/pokemon" element={<PokemonApi />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;