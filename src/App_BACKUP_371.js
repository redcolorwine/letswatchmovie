import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { Route, Routes, useParams } from 'react-router-dom';
import Tvseries from './components/pages/tvseries/tvseries';
import Films from './components/pages/films/films';
import About from './components/pages/about/about';
import MainContainer from './components/pages/mainPage/mainContainer';
import MovieInfoContainer from './components/pages/mainPage/movieInfo/movieInfoContainer';
function App() {
  const { id } = useParams();
  return (
    <div className="App">
      <Header />
      <div className="app_wrapper">
        <Routes>
          <Route path='/' element={<MainContainer />} />
          <Route path='/tvseries' element={<Tvseries />} />
<<<<<<< HEAD
          <Route path='/films/*' element={<Films />} />
=======
          <Route path='/films' element={<Films />} />
>>>>>>> bbfd233dd843d3a439b89960967558d9ec27a206
          <Route path='/about' element={<About />} />
          <Route path={`/movie/:id`} element={<MovieInfoContainer />} />
          <Route path='*' element={<MainContainer />} />
        </Routes>

      </div>
      <Footer />
    </div>
  );
}

export default App;
