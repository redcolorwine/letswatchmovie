import { connect } from "react-redux"
import { getDetailsMovie, getMovieGenres, getMovieThunkCreator, getSimilarMovie, getVideosMovie } from "../../../../redux/mainPageReducer"
import MovieInfo from "./movieInfo"

let mapStateToProps = (state) => {
    return {
        genresNames: state.main.genres,
        isMovieInfoLoading: state.main.isMovieInfoLoading,
        movieData: state.main.movieData,
        ytLinks: state.main.ytLinks,
        similarMovie: state.main.similarMovie,
        detailsMovie: state.main.detailsMovie
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
        },
        getSimilar: (movieId) => {
            dispatch(getSimilarMovie(movieId));
        },
        getDetails: (movieId) => {
            dispatch(getDetailsMovie(movieId));
        }
    }
}

let MovieInfoContainer = connect(mapStateToProps, mapDispatchToProps)(MovieInfo);

export default MovieInfoContainer;