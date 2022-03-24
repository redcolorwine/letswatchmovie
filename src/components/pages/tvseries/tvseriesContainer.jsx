import { connect } from "react-redux"
import { getTrandTVSeries } from "../../../redux/mainPageReducer"
import Tvseries from "./tvseries"

let mapStateToProps = (state) => {
    return {
        trandTVSeries: state.main.trandTVSeries,
        tvGenres: state.main.tvGenres,
        isTVSeriesLoading: state.main.isTVSeriesLoading
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getTrandTV: (page) => {
            dispatch(getTrandTVSeries(page));
        }
    }
}

const TvSeriesContainer = connect(mapStateToProps, mapDispatchToProps)(Tvseries);

export default TvSeriesContainer;