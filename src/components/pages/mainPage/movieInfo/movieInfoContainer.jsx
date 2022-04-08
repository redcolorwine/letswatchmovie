import { connect } from "react-redux"
import { getAllDetailsMovie, getMovieReviews } from "../../../../redux/moviePageReducer"

import MovieInfo from "./movieInfo"

let mapStateToProps = (state) => {
    return {
        genresNames: state.movie.genres,
        isMovieInfoLoading: state.movie.isMovieInfoLoading,
        ytLinks: state.movie.ytLinks,
        similarMovie: state.movie.similarMovie,
        detailsMovie: state.movie.detailsMovie,
        reviews: state.movie.reviews
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        //Получени данных выбранного фильма
        getAllDetails: (movieId) => {
            dispatch(getAllDetailsMovie(movieId));
        },
        getReviews: (movieId) => {
            dispatch(getMovieReviews(movieId));
        }
    }
}

let MovieInfoContainer = connect(mapStateToProps, mapDispatchToProps)(MovieInfo);

export default MovieInfoContainer;