import { connect } from "react-redux"
import { getMovieWithGenreThunkCreator, getMovieWithTrandThunkCreator, getMovieWithYearsThunkCreator } from "../../../redux/mainPageReducer"
import Films from "./films"

const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        searchMoviesWithGenre: (genreId) => {
            dispatch(getMovieWithGenreThunkCreator(genreId));
        },
        searchMovieWithYears: (yearFrom, yearTo) => {
            dispatch(getMovieWithYearsThunkCreator(yearFrom, yearTo));
        },
        searchMovieWithTrand: (time) => {
            dispatch(getMovieWithTrandThunkCreator(time));
        }
    }
}

const FilmsContainer = connect(mapStateToProps, mapDispatchToProps)(Films);

export default FilmsContainer;