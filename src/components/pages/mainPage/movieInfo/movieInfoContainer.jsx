import { connect } from "react-redux"
import MovieInfo from "./movieInfo"

let mapStateToProps = (state) => {
    return {
        mostPopularFilms: state.main.mostPopularFilms,
        chosenFilm: state.main.chosenFilm,
        genresNames: state.main.genres
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getChosenFilm: (filmId) => {
            dispatch({
                type: 'GET_ONE_FILM',
                filmId
            })
        },
        setMostPopularFilms: (mostPopularFilms) => {
            dispatch({
                type: 'SET_MOST_POPULAR_FILMS',
                mostPopularFilms
            })
        },
        setGenres: (genres) => {
            dispatch({
                type: 'SET_GENRES',
                genres
            })
        }
    }
}

let MovieInfoContainer = connect(mapStateToProps, mapDispatchToProps)(MovieInfo);

export default MovieInfoContainer;