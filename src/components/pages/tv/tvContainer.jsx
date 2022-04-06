import { connect } from "react-redux"
import { getFoundByFilterTV, getTopRatedTV, getTrandTVSeries } from "../../../redux/tvPageReducer"

import TV from "./tv"

let mapStateToProps = (state) => {
    return {
        trandTVSeries: state.tv.trandTVSeries,
        tvGenres: state.tv.tvGenres,
        isTVSeriesLoading: state.tv.isTVSeriesLoading,
        topRatedTv: state.tv.topRatedTv,
        foundByFilterTV: state.tv.foundByFilterTV,
        search404: state.tv.search404
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