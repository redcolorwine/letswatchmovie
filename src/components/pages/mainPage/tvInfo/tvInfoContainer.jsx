import { connect } from "react-redux"
import { getTVGenres, getTVThunkCreator, getVideosTV } from "../../../../redux/mainPageReducer"
import TVInfo from "./tvInfo"

let mapStateToProps = (state) => {
    return {
        tvGenres: state.main.tvGenres,
        isTVInfoLoading: state.main.isTVInfoLoading,
        tvData: state.main.tvData,
        ytLinks: state.main.ytLinks
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        //Получени данных выбранного фильма
        getTV: (tvId) => {
            dispatch(getTVThunkCreator(tvId))
        },
        getVideosTV: (tvId) => {
            dispatch(getVideosTV(tvId));
        },
        getTVGenres: () => {
            dispatch(getTVGenres());
        }
    }
}

let TVInfoContainer = connect(mapStateToProps, mapDispatchToProps)(TVInfo);

export default TVInfoContainer;