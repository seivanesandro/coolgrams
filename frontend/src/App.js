// styles
import styled from 'styled-components';
import './App.css';

// router
//import { HashLink } from 'react-router-hash-link' FIXME: must be install;
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//hook
import { useAuth } from './hooks/useAuth';

// components
import Navbar from './components/navBar/Navbar';
import Footer from './components/footer/Footer';
import Loading from './components/load/Loading';

// pages
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

const ContainerLoading = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;


function App() {

    const { auth, loading } = useAuth();

    if(loading){
        return (
            <ContainerLoading>
                <Loading />
            </ContainerLoading>
        );
    }
    console.log(loading)

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
                          element={
                              auth ? (
                                  <Home />
                              ) : (
                                  <Navigate to="login" />
                              )
                          }
                      />
                      <Route
                          path="/login"
                          element={
                              !auth ? (
                                  <Login />
                              ) : (
                                  <Navigate to="/" />
                              )
                          }
                      />
                      <Route
                          path="/register"
                          element={
                              !auth ? (
                                  <Register />
                              ) : (
                                  <Navigate to="/" />
                              )
                          }
                      />
                  </Routes>
              </main>
              <footer
                  className="Container-footer-coolGram"
                  id="footer_Coolgram"
              >
                  <Footer />
              </footer>
          </BrowserRouter>
      </div>
  );
}

export default App;
