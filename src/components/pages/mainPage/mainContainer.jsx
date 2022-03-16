import { connect } from "react-redux"
import { addUpcomingFilmsThunkCreator, getMPFilmsThunkCreator, setCurrentMainFilm, setCurrentUpcomingPage } from "../../../redux/mainPageReducer"
import Main from "./main"
//Контейнерная компонента для передачи данных state презентационной компоненте Main (главной странице)
let mapStateToProps = (state) => {
    return {
        mostPopularFilms: state.main.mostPopularFilms,
        upcommingFilms: state.main.upcommingFilms,
        genres: state.main.genres,
        currentMainFilm: state.main.currentMainFilm,
        isMainPageLoading: state.main.isMainPageLoading,
        currentUpcomingFilmPage: state.main.currentUpcomingFilmPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        //Получение фильмов для главной страницы
        getFilmsForMainPage: (page) => {
            dispatch(getMPFilmsThunkCreator(page))
        },
        //Добавления новой порции ожидаемых фильмов в массив ожидаемых фильмов
        addUpcomingFilms: (page) => {
            dispatch(addUpcomingFilmsThunkCreator(page))
        },
        //Установка текущего главного фильма
        setCurrentMainFilm: (currentFilm) => {
            dispatch(setCurrentMainFilm(currentFilm))
        },
        //Установка текущей страницы для подрузки ожидаемых фильмов
        setCurrentUpcomingPage: (currentPage) => {
            dispatch(setCurrentUpcomingPage(currentPage))
        }
    }
}

let MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default MainContainer;