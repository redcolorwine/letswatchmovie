import { connect } from "react-redux"
import { foundMoviesThunkCreator, setFoundKey, setSearchArea } from "../../redux/moviePageReducer"

import Header from "./header"

let mapStateToProps = (state) => {
    return {
        foundMovies: state.movie.foundMovies,
        isFoundMoviesLoading: state.movie.isFoundMoviesLoading,
        searchArea: state.movie.searchArea,
        foundKey: state.movie.foundKey
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        searchMovies: (movie) => {
            dispatch(foundMoviesThunkCreator(movie));
        },
        setSearchArea: (searchArea) => {
            dispatch(setSearchArea(searchArea))
        },
        setFoundKey: (foundKey) => {
            dispatch(setFoundKey(foundKey))
        }
    }
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;