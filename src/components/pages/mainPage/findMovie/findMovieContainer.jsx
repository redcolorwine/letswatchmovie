import { connect } from "react-redux"
import { getMovieWithGenreThunkCreator, getMovieWithYearsThunkCreator, setFoundPage } from "../../../../redux/moviePageReducer"

import FindMovie from "./findMovie"


let mapStateToProps = (state) => {
    return {
        foundMovies: state.movie.foundMovies,
        isFoundMoviesLoading: state.movie.isFoundMoviesLoading,
        genres: state.movie.genres,
        foundPage: state.movie.foundPage,
        foundKey: state.movie.foundKey
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setFoundPage: (foundPage) => {
            dispatch(setFoundPage(foundPage));
        },
        searchMoviesWithGenre: (genreId, page) => {
            dispatch(getMovieWithGenreThunkCreator(genreId, page));
        },
        searchMovieWithYears: (yearFrom, yearTo, page) => {
            dispatch(getMovieWithYearsThunkCreator(yearFrom, yearTo, page));
        },
    }
}

const FindMovieContainer = connect(mapStateToProps, mapDispatchToProps)(FindMovie);

export default FindMovieContainer;