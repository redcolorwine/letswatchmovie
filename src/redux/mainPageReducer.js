import { filmsAPI } from '../api/api';
//данные для инициализации начального state
let initialState = {
    //Фильмы
    //Данные фильмов
    mostPopularFilms: '', //популярные фильмы
    upcommingFilms: '', //ожидаемые фильмы
    currentMainFilm: 5, //выбранный фильм для отображения на главной страницы
    currentUpcomingFilmPage: 2, //текущая страница для последующей загрузки ожидаемых фильмов (при нажатии на кнопку "далее" на главной странице)
    genres: '', //жанры
    //Загрузчики
    isMainPageLoading: true, //производится ли загрузка главной страницы
}

//редьюсер
let mainPageReducer = (state = initialState, action) => {
    switch (action.type) {
        //ФИЛЬМЫ
        //инициализация популярных фильмов
        case 'SET_MOST_POPULAR_FILMS':
            return {
                ...state,
                mostPopularFilms: action.mostPopularFilms
            }
        //инициализация ожидаемых фильмов    
        case 'SET_UPCOMING_FILMS':
            return {
                ...state,
                upcommingFilms: action.upcommingFilms
            }
        //прогрузка ожидаемых фильмов при нажатии кнопки "далее"(добавляются в конец)
        case 'ADD_UPCOMING_FILMS':
            return {
                ...state,
                // upcommingFilms: state.upcommingFilms.concat(action.addedFilms)
                upcommingFilms: { ...state.upcommingFilms, ...action.addedFilms }
            }
        //установка загрузки главной страницы
        case 'SET_IS_LOADING': {
            return {
                ...state,
                isMainPageLoading: action.loading
            }
        }
        //инициализируем жанры
        case 'SET_GENRES':
            return {
                ...state,
                genres: action.genres
            }
        //устанавливаем текущий главный фильм
        case 'SET_CURRENT_MAIN_FILM':
            return {
                ...state,
                currentMainFilm: action.currentFilm
            }
        //устанавливаем страницу ожидаемых фильмов для последующей их загрузки
        case 'SET_UPCOMING_CURRENT_PAGE': {
            let cPage;
            if (action.currentPage < 1) {
                cPage = 20;
            } else {
                cPage = action.currentPage;
            }
            return {
                ...state,
                currentUpcomingFilmPage: cPage
            }
        }
        default: return state
    }
}
//thunk для получения фильмов главной страницы(популярных и ожидаемых, а также жанров)
export const getMPFilmsThunkCreator = (page) => {

    return (dispatch) => {
        //запрос к API. Передаем номер страницы ожидаемых фильмов, чтобы отобразить в разделе НОВИНКИ
        filmsAPI.getFilmsForMainPage(page).then(response => {
            //Диспатчим через Action Creators в state полученные через API данные (запрос состоит из трех запросов одновременно *axios.all())
            dispatch(setMostPopularFilms(response[0].data));
            dispatch(setGenres(response[1].data))
            dispatch(setUpcommingFilms(response[2].data));

        }).then(() => {
            //после того как данные проинициализированы, разрешаем загрузку страницы
            dispatch(setIsLoading(false));

        })
    }

}

//thunk для получения следующей страницы ожидаемых фильмов и последующего добавления их в массив ожидаемых фильмов
export const addUpcomingFilmsThunkCreator = (page) => {
    return (dispatch) => {
        filmsAPI.getUpcomingFilms(page).then(response => {
            dispatch(addUpcomingFilms(response))
        })
    }
}


//Action Creators для удобной передачи action
export const setMostPopularFilms = (mostPopularFilms) => { return { type: 'SET_MOST_POPULAR_FILMS', mostPopularFilms } }
export const setUpcommingFilms = (upcommingFilms) => { return { type: 'SET_UPCOMING_FILMS', upcommingFilms } }
export const setTrandTVSeries = (trandTVSeries) => { return { type: 'SET_TRAND_TVSERIES', trandTVSeries } }
export const setGenres = (genres) => { return { type: 'SET_GENRES', genres } }
export const setIsLoading = (loading) => { return { type: 'SET_IS_LOADING', loading } }
export const setCurrentMainFilm = (currentFilm) => { return { type: 'SET_CURRENT_MAIN_FILM', currentFilm } }
export const addUpcomingFilms = (addedFilms) => { return { type: 'ADD_UPCOMING_FILMS', addedFilms } }
export const setCurrentUpcomingPage = (currentPage) => { return { type: 'SET_UPCOMING_CURRENT_PAGE', currentPage } }

export default mainPageReducer;