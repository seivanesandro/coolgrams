// styles
////import styled from 'styled-components';
import './App.css';

// router
//import { HashLink } from 'react-router-hash-link' FIXME: must be install;
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// pages
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';


function App() {
  return (
      <div className="coolGramApp">
          <BrowserRouter>
              <header className="Container-header-coolGram">
                  <h1>menu</h1>
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
          </BrowserRouter>
      </div>
  );
}

export default App;
