import { connect } from "react-redux"
import FindMovie from "./findMovie"


let mapStateToProps = (state) => {
    return {
        foundMovies: state.main.foundMovies,
        isFoundMoviesLoading: state.main.isFoundMoviesLoading,
        genres: state.main.genres,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
    }
}

const FindMovieContainer = connect(mapStateToProps, mapDispatchToProps)(FindMovie);

export default FindMovieContainer;