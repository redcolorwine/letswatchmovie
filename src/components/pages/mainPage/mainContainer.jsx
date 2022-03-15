import { connect } from "react-redux"
import { addUpcomingFilmsThunkCreator, getMPFilmsThunkCreator, setCurrentMainFilm } from "../../../redux/mainPageReducer"
import Main from "./main"

let mapStateToProps = (state) => {
    return {
        filmItems: state.main.filmItems,
        mostPopularFilms: state.main.mostPopularFilms,
        upcommingFilms: state.main.upcommingFilms,
        genres: state.main.genres,
        currentMainFilm: state.main.currentMainFilm,
        isMainPageLoading: state.main.isMainPageLoading
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getFilmsForMainPage: (page) => {
            dispatch(getMPFilmsThunkCreator(page))
        },
        addUpcomingFilms: (page) => {
            dispatch(addUpcomingFilmsThunkCreator(page))
        },
        setCurrentMainFilm: (currentFilm) => {
            dispatch(setCurrentMainFilm(currentFilm))
        }
    }
}

let MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default MainContainer;