import { usersAPI } from '../api/api';
//данные для инициализации начального state
let initialState = {
    isMainPageLoading: true, //производится ли загрузка главной страницы
    isMovieInfoLoading: true,//производится ли загрузка информационной страницы
    mostPopularFilms: '', //популярные фильмы
    upcommingFilms: '', //ожидаемые фильмы
    genres: '', //жанры
    chosenFilm: 'none', //выбранный фильм для просмотра информации
    currentMainFilm: 5, //выбранный фильм для отображения на главной страницы
    currentUpcomingFilmPage: 2, //текущая страница для последующей загрузки ожидаемых фильмов (при нажатии на кнопку "далее" на главной странице)
    foundMovies: '',//Найденные фильмы при поиске через navbar
    isFoundMoviesLoading: true, //производится ли загрузка найденных фильмов
    searchArea: ''
}

//редьюсер
let mainPageReducer = (state = initialState, action) => {
    switch (action.type) {
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
        //установка загрузки найденных фильмов по запросу
        case 'SET_IS_FOUND_MOVIES_LOADING': {
            return {
                ...state,
                isFoundMoviesLoading: action.loading
            }
        }
        //установка загрузки информационной страницы
        case 'SET_IS_MOVIE_INFO_LOADING': {

            return {
                ...state,
                isMovieInfoLoading: action.movieLoading
            }
        }
        //получение данных выбранного фильма для информационной страницы
        case 'GET_ONE_FILM':
            //если фильм принадлежит списку популярных, то берем данные этого фильма с этого массива
            let chose = state.mostPopularFilms.results.filter(film => film.id == action.filmId);
            //иначе фильм из списка ожидаемых и следовательно данные берем из массива ожидаемых фильмов
            if (chose == '') {
                chose = state.upcommingFilms.results.filter(film => film.id == action.filmId);
            }
            return {
                ...state,
                chosenFilm: chose
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
        case 'SET_FOUND_MOVIES': {
            return {
                ...state,
                foundMovies: action.foundMovies
            }
        }
        case 'SET_SEARCH_AREA': {
            return {
                ...state,
                searchArea: action.searchArea
            }
        }
        default: return state
    }
}
//thunk для получения фильмов главной страницы(популярных и ожидаемых, а также жанров)
export const getMPFilmsThunkCreator = (page) => {

    return (dispatch) => {
        //запрос к API. Передаем номер страницы ожидаемых фильмов, чтобы отобразить в разделе НОВИНКИ
        usersAPI.getFilmsForMainPage(page).then(response => {
            //Диспатчим через Action Creators в state полученные через API данные (запрос состоит из трех запросов одновременно *axios.all())
            // dispatch(setMostPopularFilms(response[0].data.results));
            dispatch(setMostPopularFilms(response[0].data));
            dispatch(setGenres(response[1].data))
            // dispatch(setUpcommingFilms(response[2].data.results));
            dispatch(setUpcommingFilms(response[2].data));

        }).then(() => {
            //после того как данные проинициализированы, разрешаем загрузку страницы
            dispatch(setIsLoading(false));

        })
    }

}
//thunk для получения фильмов информационной страницы(популярных и ожидаемых, а также жанров) Также, передаем id выбранного фильма
export const getMovieInfoThunkCreator = (filmId, page) => {

    return (dispatch) => {

        usersAPI.getFilmsForMovieInfo(page).then(response => {
            //Диспатчим через Action Creators в state полученные через API данные (запрос состоит из трех запросов одновременно *axios.all())
            // dispatch(setMostPopularFilms(response[0].data.results));
            dispatch(setMostPopularFilms(response[0].data));
            dispatch(setGenres(response[1].data))
            // dispatch(setUpcommingFilms(response[2].data.results))
            dispatch(setUpcommingFilms(response[2].data))
            dispatch(getOneFilm(filmId))

        }).then(() => {
            //после того как данные проинициализированы, разрешаем загрузку страницы
            dispatch(setIsMovieInfoLoading(false));

        })
    }

}
//thunk для получения следующей страницы ожидаемых фильмов и последующего добавления их в массив ожидаемых фильмов
export const addUpcomingFilmsThunkCreator = (page) => {
    return (dispatch) => {
        usersAPI.getUpcomingFilms(page).then(response => {
            // dispatch(addUpcomingFilms(response.results))
            dispatch(addUpcomingFilms(response))
        })
    }
}

export const foundMoviesThunkCreator = (movie) => {

    return (dispatch) => {
        usersAPI.searchMovie(movie).then(response => {
            dispatch(setFoundMovies(response.data))
        }).then(() => {
            dispatch(setIsFoundMoviesLoading(false));
        })
    }
}
//Action Creators для удобной передачи action
export const setMostPopularFilms = (mostPopularFilms) => { return { type: 'SET_MOST_POPULAR_FILMS', mostPopularFilms } }
export const setUpcommingFilms = (upcommingFilms) => { return { type: 'SET_UPCOMING_FILMS', upcommingFilms } }
export const setGenres = (genres) => { return { type: 'SET_GENRES', genres } }
export const setIsLoading = (loading) => { return { type: 'SET_IS_LOADING', loading } }
export const setIsMovieInfoLoading = (movieLoading) => { return { type: 'SET_IS_MOVIE_INFO_LOADING', movieLoading } }
export const setIsFoundMoviesLoading = (foundMovieLoading) => { return { type: 'SET_IS_FOUND_MOVIES_LOADING', foundMovieLoading } }
export const setCurrentMainFilm = (currentFilm) => { return { type: 'SET_CURRENT_MAIN_FILM', currentFilm } }
export const getOneFilm = (filmId) => { return { type: 'GET_ONE_FILM', filmId } }
export const addUpcomingFilms = (addedFilms) => { return { type: 'ADD_UPCOMING_FILMS', addedFilms } }
export const setCurrentUpcomingPage = (currentPage) => { return { type: 'SET_UPCOMING_CURRENT_PAGE', currentPage } }
export const setFoundMovies = (foundMovies) => { return { type: 'SET_FOUND_MOVIES', foundMovies } }
export const setSearchArea = (searchArea) => { return { type: 'SET_SEARCH_AREA', searchArea } }
export default mainPageReducer;