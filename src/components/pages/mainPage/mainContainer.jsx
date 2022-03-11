import { connect } from "react-redux"
import Main from "./main"

let mapStateToProps = (state) => {
    return {
        filmItems: state.main.filmItems,
        mostPopularFilms: state.main.mostPopularFilms
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setMostPopularFilms: (mostPopularFilms) => {
            dispatch({
                type: 'SET_MOST_POPULAR_FILMS',
                mostPopularFilms
            })
        }
    }
}

let MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default MainContainer;