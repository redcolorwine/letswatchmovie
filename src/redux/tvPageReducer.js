import { filmsAPI } from '../api/api';
//данные для инициализации начального state
let initialState = {
  
    //Сериалы
    isTVInfoLoading: true,
    isTVSeriesLoading: true,
    trandTVSeries: '', //Трендовые 
    tvGenres: '', //Жанры сериалов
    tvData: '', //Данные сериала
    topRatedTv: '', //С высоким рейтингом
    similarTv: '', //Похожие
    detailsTv: '', //Детальные данные сериала
    foundByFilterTV: '', //Найденные по фильтру телепередачи
    search404: '', //Сообщение о результате поиска
    //YouTube ссылки
    ytLinks: ''
}

//редьюсер
let tvPageReducer = (state = initialState, action) => {
    switch (action.type) {
        //СЕРИАЛЫ    
        ////Инициализация трендовых сериалов
        case 'SET_TRAND_TVSERIES':
            return {
                ...state,
                trandTVSeries: action.trandTVSeries
            }
        ////Инициализация найденных телепередач по фильтру
        case 'SET_FOUND_BY_FILTER_TV': {
            if (action.foundByFilterTV.results.length == 0) {
                return {
                    ...state,
                    foundByFilterTV: action.foundByFilterTV,
                    search404: 'По запросу ничего не найдено..'
                }
            } else {
                return {
                    ...state,
                    foundByFilterTV: action.foundByFilterTV,
                    search404: ''
                }
            }
        }
        ///Инициализация подробных данных о сериале
        case 'SET_DETAILS_TV':
            return {
                ...state,
                detailsTv: action.detailsTv
            }
        ////Инициализация жанров сериалов
        case 'SET_TV_GENRES':
            return {
                ...state,
                tvGenres: action.tvGenres
            }
        //Инициализация данных о сериале
        case 'SET_TV_DATA': {
            return {
                ...state,
                tvData: action.tvData
            }
        }
        //Инициализация подобных сериалов
        case 'SET_SIMILAR_TV': {
            return {
                ...state,
                similarTv: action.similarTv
            }
        }
        //Инициализация трендовых сериалов
        case 'SET_TOP_RATED_TV': {
            return {
                ...state,
                topRatedTv: action.topRatedTv
            }
        }
        //Загрузка сериалов
        case 'SET_IS_TVSERIES_LOADING': {
            return {
                ...state,
                isTVSeriesLoading: action.seriesLoading
            }
        }
        //Загрузка информации
        case 'SET_IS_TV_INFO_LOADING': {
            return {
                ...state,
                isTVInfoLoading: action.tvLoading
            }
        }
        ////Инициализация данных ютуб ссылок
        case 'SET_YOUTUBE_LINKS': {
            return {
                ...state,
                ytLinks: action.ytLinks
            }
        }
        default: return state
    }
}

//Получение трендовых сериалов
export const getTrandTVSeries = (page) => {
    return (dispatch) => {
        filmsAPI.getTVSeries(page).then(response => {
            dispatch(setTrandTVSeries(response[0].data));
            dispatch(setTVGenres(response[1].data));
        }).then(() => {
            dispatch(setIsTvSeriesLoading(false));
        })
    }
}
//Получение жанров сериалов
export const getTVGenres = () => {
    return (dispatch) => {
        filmsAPI.getTVgenres().then(response => {
            dispatch(setTVGenres(response.data))
        })
    }
}

//Получение рейтинговых фильмов
export const getTopRatedTV = (page) => {
    return (dispatch) => {
        filmsAPI.searchTopRatedTV(page).then(response => {
            dispatch(setTopRatedTv(response.data));
        })
    }
}
//Получени телепередач по фильтру
export const getFoundByFilterTV = (genreId, yearFrom, yearTo, sortBy, page) => {
    return (dispatch) => {
        filmsAPI.getSerialsByFillter(genreId, yearFrom, yearTo, sortBy, page).then(response => {
            dispatch(setFoundByFilterTV(response.data));
        })
    }
}

//Получение данных фильма(не подробных)
export const getTVThunkCreator = (tvId) => {
    return (dispatch) => {
        filmsAPI.getTVbyID(tvId).then(response => {
            dispatch(setTVData(response.data.tv_results[0]))
        }).then(() => {
            dispatch(setIsTVInfoLoading(false));
        })
    }
}
//Получение ютуб трейлеров к сериалу
export const getVideosTV = (tvId) => {
    return (dispatch) => {
        filmsAPI.getTvVideos(tvId).then(response => {
            dispatch(setYouTubeLinks(response));
        })
    }
}
//Поиск похожих сериалов
export const getSimilarTv = (tvId, page) => {
    return (dispatch) => {
        filmsAPI.getSimilarTV(tvId, page).then(response => {
            dispatch(setSimilarTv(response.data));
        })
    }
}

//Получение подробностей сериала
export const getDetailsTv = (tvId) => {
    return (dispatch) => {
        filmsAPI.getDetailsTv(tvId).then(response => {
            dispatch(setDetailsTv(response));
        })
    }
}
//Получение всех деталей по сериалу
export const getAllDetailsTV = (tvId) => {
    return (dispatch) => {
        filmsAPI.getAllDetailsTV(tvId).then(response => {
            dispatch(setSimilarTv(response[0].data));
            dispatch(setTVGenres(response[1].data));
            dispatch(setYouTubeLinks(response[2].data.results));
            dispatch(setDetailsTv(response[3].data));
        }).then(() => {
            dispatch(setIsTVInfoLoading(false));
        })
    }
}
//Action Creators для удобной передачи action
export const setTrandTVSeries = (trandTVSeries) => { return { type: 'SET_TRAND_TVSERIES', trandTVSeries } }
export const setTVGenres = (tvGenres) => { return { type: 'SET_TV_GENRES', tvGenres } }
export const setIsTVInfoLoading = (isTVInfoLoading) => { return { type: 'SET_IS_TV_INFO_LOADING', isTVInfoLoading } }
export const setIsTvSeriesLoading = (seriesLoading) => { return { type: 'SET_IS_TVSERIES_LOADING', seriesLoading } }
export const setFoundByFilterTV = (foundByFilterTV) => { return { type: 'SET_FOUND_BY_FILTER_TV', foundByFilterTV } }
export const setTVData = (tvData) => { return { type: 'SET_TV_DATA', tvData } }
export const setTopRatedTv = (topRatedTv) => { return { type: 'SET_TOP_RATED_TV', topRatedTv } }
export const setYouTubeLinks = (ytLinks) => { return { type: 'SET_YOUTUBE_LINKS', ytLinks } }
export const setSimilarTv = (similarTv) => { return { type: 'SET_SIMILAR_TV', similarTv } }
export const setDetailsTv = (detailsTv) => { return { type: 'SET_DETAILS_TV', detailsTv } }
export default tvPageReducer;