import { connect } from "react-redux"
import { getMovieInfoThunkCreator } from "../../../../redux/mainPageReducer"
import MovieInfo from "./movieInfo"

let mapStateToProps = (state) => {
    return {
        mostPopularFilms: state.main.mostPopularFilms,
        chosenFilm: state.main.chosenFilm,
        genresNames: state.main.genres,
        isMovieInfoLoading: state.main.isMovieInfoLoading,
        currentUpcomingFilmPage: state.main.currentUpcomingFilmPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        //Получени данных выбранного фильма
        getChosenFilm: (filmId, page) => {
            dispatch(getMovieInfoThunkCreator(filmId, page))
        },
    }
}

let MovieInfoContainer = connect(mapStateToProps, mapDispatchToProps)(MovieInfo);

export default MovieInfoContainer;