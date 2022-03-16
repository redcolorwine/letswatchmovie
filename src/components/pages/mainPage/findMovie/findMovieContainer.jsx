import { connect } from "react-redux"
import { foundMoviesThunkCreator, setSearchArea } from "../../../../redux/mainPageReducer"
import FindMovie from "./findMovie"


let mapStateToProps = (state) => {
    return {
        foundMovies: state.main.foundMovies,
        isFoundMoviesLoading: state.main.isFoundMoviesLoading,
        searchArea: state.main.searchArea
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        searchMovies: (movie) => {
            dispatch(foundMoviesThunkCreator(movie));
        },
        setSearchArea: (searchArea) => {
            dispatch(setSearchArea(searchArea))
        }
    }
}

const FindMovieContainer = connect(mapStateToProps, mapDispatchToProps)(FindMovie);

export default FindMovieContainer;