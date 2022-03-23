import { connect } from "react-redux"
import { getMovieWithGenreThunkCreator, getMovieWithTrandThunkCreator, getMovieWithYearsThunkCreator, setFoundKey } from "../../../redux/mainPageReducer"
import Films from "./films"

const mapStateToProps = (state) => {
    return {
        foundKey: state.main.foundKey
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
        }
    }
}

const FilmsContainer = connect(mapStateToProps, mapDispatchToProps)(Films);

export default FilmsContainer;