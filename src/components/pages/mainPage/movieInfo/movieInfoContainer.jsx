import { connect } from "react-redux"
import MovieInfo from "./movieInfo"

let mapStateToProps = (state) => {
    return {
        mostPopularFilms: state.main.mostPopularFilms,
        chosenFilm: state.main.chosenFilm
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
        }
    }
}

let MovieInfoContainer = connect(mapStateToProps, mapDispatchToProps)(MovieInfo);

export default MovieInfoContainer;