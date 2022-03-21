import { connect } from "react-redux"
import {getMovieThunkCreator } from "../../../../redux/mainPageReducer"
import MovieInfo from "./movieInfo"

let mapStateToProps = (state) => {
    return {
        genresNames: state.main.genres,
        isMovieInfoLoading: state.main.isMovieInfoLoading,
        movieData: state.main.movieData
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        //Получени данных выбранного фильма
        getMovie: (movieId) => {
            dispatch(getMovieThunkCreator(movieId))
        }
    }
}

let MovieInfoContainer = connect(mapStateToProps, mapDispatchToProps)(MovieInfo);

export default MovieInfoContainer;