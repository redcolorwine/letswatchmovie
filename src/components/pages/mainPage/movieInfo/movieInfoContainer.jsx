import { connect } from "react-redux"
import { getMovieGenres, getMovieThunkCreator, getVideosMovie } from "../../../../redux/mainPageReducer"
import MovieInfo from "./movieInfo"

let mapStateToProps = (state) => {
    return {
        genresNames: state.main.genres,
        isMovieInfoLoading: state.main.isMovieInfoLoading,
        movieData: state.main.movieData,
        ytLinks: state.main.ytLinks
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        //Получени данных выбранного фильма
        getMovie: (movieId) => {
            dispatch(getMovieThunkCreator(movieId))
        },
        getVideosMovie: (movieId) => {
            dispatch(getVideosMovie(movieId));
        },
        getGenres: () => {
            dispatch(getMovieGenres());
        }
    }
}

let MovieInfoContainer = connect(mapStateToProps, mapDispatchToProps)(MovieInfo);

export default MovieInfoContainer;