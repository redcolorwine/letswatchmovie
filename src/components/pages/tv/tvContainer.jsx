import { connect } from "react-redux"
import { getFoundByFilterTV, getTopRatedTV, getTrandTVSeries, getTVGenres } from "../../../redux/mainPageReducer"
import TV from "./tv"

let mapStateToProps = (state) => {
    return {
        trandTVSeries: state.main.trandTVSeries,
        tvGenres: state.main.tvGenres,
        isTVSeriesLoading: state.main.isTVSeriesLoading,
        topRatedTv: state.main.topRatedTv,
        foundByFilterTV: state.main.foundByFilterTV,
        search404: state.main.search404
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getTrandTV: (page) => {
            dispatch(getTrandTVSeries(page));
        },
        getTopRated: (page) => {
            dispatch(getTopRatedTV(page));
        },
        getTVByFilter: (genreId, yearFrom, yearTo, sortby, page) => {
            dispatch(getFoundByFilterTV(genreId, yearFrom, yearTo, sortby, page));
        }
    }
}

const TVContainer = connect(mapStateToProps, mapDispatchToProps)(TV);

export default TVContainer;