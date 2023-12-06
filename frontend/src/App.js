// styles
////import styled from 'styled-components';
import './App.css';

// router
//import { HashLink } from 'react-router-hash-link' FIXME: must be install;
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// components
import Navbar from './components/navBar/Navbar';
import Footer from './components/footer/Footer';

// pages
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';



function App() {
  return (
      <div className="coolGramApp">
          <BrowserRouter>
              <header className="Container-header-coolGram">
                  <Navbar />
              </header>
              <main className="Container-main-coolGram">
                  <Routes>
                      <Route
                          path="/"
                          element={<Home />}
                      />
                      <Route
                          path="/login"
                          element={<Login />}
                      />
                      <Route
                          path="/register"
                          element={<Register />}
                      />
                  </Routes>
              </main>
              <footer className="Container-footer-coolGram" id="footer_Coolgram">
                  <Footer />
              </footer>
          </BrowserRouter>
      </div>
  );
}

export default App;
