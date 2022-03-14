import { connect } from "react-redux"
import Main from "./main"

let mapStateToProps = (state) => {
    return {
        filmItems: state.main.filmItems,
        mostPopularFilms: state.main.mostPopularFilms,
        genres: state.main.genres,
        currentMainFilm: state.main.currentMainFilm
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
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
        },
        setCurrentMainFilm: (currentFilm) => {
            dispatch({
                type: 'SET_CURRENT_MAIN_FILM',
                currentFilm
            })
        }
    }
}

let MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default MainContainer;