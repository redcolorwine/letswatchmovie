import { connect } from "react-redux"
import { getTVThunkCreator } from "../../../../redux/mainPageReducer"
import TVInfo from "./tvInfo"

let mapStateToProps = (state) => {
    return {
        tvGenres: state.main.tvGenres,
        isTVInfoLoading: state.main.isTVInfoLoading,
        tvData: state.main.tvData
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        //Получени данных выбранного фильма
        getTV: (tvId) => {
            dispatch(getTVThunkCreator(tvId))
        }
    }
}

let TVInfoContainer = connect(mapStateToProps, mapDispatchToProps)(TVInfo);

export default TVInfoContainer;