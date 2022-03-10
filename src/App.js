import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { Route, Routes } from 'react-router-dom';
import Main from './components/pages/mainPage/main';
import Tvseries from './components/pages/tvseries/tvseries';
import Films from './components/pages/films/films';
import About from './components/pages/about/about';
function App() {
  return (
    <div className="App">
      <Header />
      <div className="app_wrapper">
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/tvseries' element={<Tvseries />} />
          <Route path='/films' element={<Films />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Main />} />
        </Routes>

      </div>
      <Footer />
    </div>
  );
}

export default App;
