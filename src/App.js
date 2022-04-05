import './App.css';
import Footer from './components/footer/footer';
import { Route, Routes} from 'react-router-dom';
import About from './components/pages/about/about';
import MainContainer from './components/pages/mainPage/mainContainer';
import MovieInfoContainer from './components/pages/mainPage/movieInfo/movieInfoContainer';
import HeaderContainer from './components/header/headerContainer';
import FindMovieContainer from './components/pages/mainPage/findMovie/findMovieContainer';
import FilmsContainer from './components/pages/films/filmsContainer';
import TVInfoContainer from './components/pages/mainPage/tvInfo/tvInfoContainer';
import TVContainer from './components/pages/tv/tvContainer';

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
          <Route path='/films/*' element={<FilmsContainer />} />
          <Route path='/about' element={<About />} />
          <Route path='/pagetv' element={<TVContainer />} />
          {/* Передаем id в адресную строку компонента MovieInfo, чтобы для каждого фильма была уникальная страница */}
          <Route path={`/movie/:id`} element={<MovieInfoContainer key={window.location.pathname} />} />
          {/* Если введен неверный путь, что будет рендериться главная компонента */}
          <Route path={`/tv/:id`} element={<TVInfoContainer />} />
          <Route path='*' element={<MainContainer />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
