import './App.css';
import Footer from './components/footer/footer';
import { Route, Routes, useParams } from 'react-router-dom';
import Tvseries from './components/pages/tvseries/tvseries';
import Films from './components/pages/films/films';
import About from './components/pages/about/about';
import MainContainer from './components/pages/mainPage/mainContainer';
import MovieInfoContainer from './components/pages/mainPage/movieInfo/movieInfoContainer';
import HeaderContainer from './components/header/headerContainer';
import FindMovieContainer from './components/pages/mainPage/findMovie/findMovieContainer';

function App() {
  //Выделяем id из адресной строки браузера для последующей передачи компоненту MovieInfo
  // и формирования нового адреса этого компонента

  return (
    <div className="App">
      <HeaderContainer />
      <div className="app_wrapper">
        {/* РОУТИНГ */}
        <Routes>
          <Route path='/' element={<MainContainer />} />
          <Route path='findmovie/:nameMovie' element={<FindMovieContainer />} />
          <Route path='/tvseries' element={<Tvseries />} />
          <Route path='/films/*' element={<Films />} />
          <Route path='/about' element={<About />} />
          {/* Передаем id в адресную строку компонента MovieInfo, чтобы для каждого фильма была уникальная страница */}
          <Route path={`/movie/:id`} element={<MovieInfoContainer />} />
          {/* Если введен неверный путь, что будет рендериться главная компонента */}
          <Route path='*' element={<MainContainer />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
