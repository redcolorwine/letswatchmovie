import { connect } from "react-redux"
import { getAllDetailsMovie } from "../../../../redux/mainPageReducer"
import MovieInfo from "./movieInfo"

let mapStateToProps = (state) => {
    return {
        genresNames: state.main.genres,
        isMovieInfoLoading: state.main.isMovieInfoLoading,
        ytLinks: state.main.ytLinks,
        similarMovie: state.main.similarMovie,
        detailsMovie: state.main.detailsMovie
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        //Получени данных выбранного фильма
        getAllDetails: (movieId) => {
            dispatch(getAllDetailsMovie(movieId));
        }
    }
}

let MovieInfoContainer = connect(mapStateToProps, mapDispatchToProps)(MovieInfo);

export default MovieInfoContainer;