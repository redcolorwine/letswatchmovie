import { connect } from "react-redux"
import { getMovieInfoThunkCreator } from "../../../../redux/mainPageReducer"
import MovieInfo from "./movieInfo"

let mapStateToProps = (state) => {
    return {
        mostPopularFilms: state.main.mostPopularFilms,
        chosenFilm: state.main.chosenFilm,
        genresNames: state.main.genres,
        isMovieInfoLoading: state.main.isMovieInfoLoading
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getChosenFilm: (filmId) => {
            dispatch(getMovieInfoThunkCreator(filmId))
        },
    }
}

let MovieInfoContainer = connect(mapStateToProps, mapDispatchToProps)(MovieInfo);

export default MovieInfoContainer;