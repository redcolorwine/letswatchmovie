import { connect } from "react-redux"
import { getMovieGenres, getMovieWithGenreThunkCreator, getMovieWithTrandThunkCreator, getMovieWithYearsThunkCreator, setFoundKey } from "../../../redux/moviePageReducer"

import Films from "./films"

const mapStateToProps = (state) => {
    return {
        foundKey: state.movie.foundKey
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        searchMoviesWithGenre: (genreId, page) => {
            dispatch(getMovieWithGenreThunkCreator(genreId, page));
        },
        searchMovieWithYears: (yearFrom, yearTo, page) => {
            dispatch(getMovieWithYearsThunkCreator(yearFrom, yearTo, page));
        },
        searchMovieWithTrand: (time) => {
            dispatch(getMovieWithTrandThunkCreator(time));
        },
        setFoundKey: (foundKey) => {
            dispatch(setFoundKey(foundKey));
        },
        getGenres: () => {
            dispatch(getMovieGenres());
        }
    }
}

const FilmsContainer = connect(mapStateToProps, mapDispatchToProps)(Films);

export default FilmsContainer;