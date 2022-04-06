import { connect } from "react-redux"
import { getAllDetailsTV } from "../../../../redux/tvPageReducer"
import TVInfo from "./tvInfo"

let mapStateToProps = (state) => {
    return {
        tvGenres: state.tv.tvGenres,
        isTVInfoLoading: state.tv.isTVInfoLoading,
        ytLinks: state.tv.ytLinks,
        similarTv: state.tv.similarTv,
        detailsTv: state.tv.detailsTv
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        //Получени данных выбранного фильма
        getAllDetails: (id) => {
            dispatch(getAllDetailsTV(id));
        }
    }
}

let TVInfoContainer = connect(mapStateToProps, mapDispatchToProps)(TVInfo);

export default TVInfoContainer;