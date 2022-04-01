import { connect } from "react-redux"
import { getAllDetailsTV} from "../../../../redux/mainPageReducer"
import TVInfo from "./tvInfo"

let mapStateToProps = (state) => {
    return {
        tvGenres: state.main.tvGenres,
        isTVInfoLoading: state.main.isTVInfoLoading,
        ytLinks: state.main.ytLinks,
        similarTv: state.main.similarTv,
        detailsTv: state.main.detailsTv
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