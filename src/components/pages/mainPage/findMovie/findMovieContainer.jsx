import { connect } from "react-redux"
import { getMovieWithGenreThunkCreator, getMovieWithYearsThunkCreator, setFoundPage } from "../../../../redux/mainPageReducer"
import FindMovie from "./findMovie"


let mapStateToProps = (state) => {
    return {
        foundMovies: state.main.foundMovies,
        isFoundMoviesLoading: state.main.isFoundMoviesLoading,
        genres: state.main.genres,
        foundPage: state.main.foundPage,
        foundKey: state.main.foundKey
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