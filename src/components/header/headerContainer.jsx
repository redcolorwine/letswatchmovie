import { connect } from "react-redux"
import { foundMoviesThunkCreator, setFoundKey, setSearchArea } from "../../redux/mainPageReducer"
import Header from "./header"

let mapStateToProps = (state) => {
    return {
        foundMovies: state.main.foundMovies,
        isFoundMoviesLoading: state.main.isFoundMoviesLoading,
        searchArea: state.main.searchArea,
        foundKey: state.main.foundKey
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