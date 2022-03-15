import { usersAPI } from '../api/api';

let initialState = {
    isMainPageLoading: true,
    isMovieInfoLoading: true,
    mostPopularFilms: '',
    upcommingFilms: '',
    genres: '',
    chosenFilm: 'none',
    currentMainFilm: 5
}


let mainPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MOST_POPULAR_FILMS':
            return {
                ...state,
                mostPopularFilms: action.mostPopularFilms
            }
        case 'SET_UPCOMING_FILMS':
            return {
                ...state,
                upcommingFilms: action.upcommingFilms
            }
        case 'ADD_UPCOMING_FILMS':
            debugger;
            return {
                ...state,
                upcommingFilms: state.upcommingFilms.concat(action.addedFilms)

            }
        case 'SET_IS_LOADING': {
            return {
                ...state,
                isMainPageLoading: action.loading
            }
        }
        case 'SET_IS_MOVIE_INFO_LOADING': {

            return {
                ...state,
                isMovieInfoLoading: action.movieLoading
            }
        }
        case 'GET_ONE_FILM':
            let chose = state.mostPopularFilms.filter(film => film.id == action.filmId);
            if (chose == '') {
                chose = state.upcommingFilms.filter(film => film.id == action.filmId);
            }
            debugger;
            return {
                ...state,
                chosenFilm: chose
            }
        case 'SET_GENRES':
            return {
                ...state,
                genres: action.genres
            }
        case 'SET_CURRENT_MAIN_FILM':
            return {
                ...state,
                currentMainFilm: action.currentFilm
            }
        default: return state
    }
}

export const getMPFilmsThunkCreator = (page) => {

    return (dispatch) => {

        usersAPI.getFilmsForMainPage(page).then(response => {

            dispatch(setMostPopularFilms(response[0].data.results));
            dispatch(setGenres(response[1].data))
            dispatch(setUpcommingFilms(response[2].data.results));

        }).then(() => {

            dispatch(setIsLoading(false));

        })
    }

}

export const getMovieInfoThunkCreator = (filmId) => {

    return (dispatch) => {

        usersAPI.getFilmsForMovieInfo().then(response => {

            dispatch(setMostPopularFilms(response[0].data.results));
            dispatch(setGenres(response[1].data))
            dispatch(setUpcommingFilms(response[2].data.results))
            dispatch(getOneFilm(filmId))


        }).then(() => {

            dispatch(setIsMovieInfoLoading(false));

        })
    }

}

export const addUpcomingFilmsThunkCreator = (page) => {
    return (dispatch) => {
        usersAPI.getUpcomingFilms(page).then(response => {
            dispatch(addUpcomingFilms(response.results))
        })
    }
}

export const setMostPopularFilms = (mostPopularFilms) => { return { type: 'SET_MOST_POPULAR_FILMS', mostPopularFilms } }
export const setUpcommingFilms = (upcommingFilms) => { return { type: 'SET_UPCOMING_FILMS', upcommingFilms } }
export const setGenres = (genres) => { return { type: 'SET_GENRES', genres } }
export const setIsLoading = (loading) => { return { type: 'SET_IS_LOADING', loading } }
export const setIsMovieInfoLoading = (movieLoading) => { return { type: 'SET_IS_MOVIE_INFO_LOADING', movieLoading } }
export const setCurrentMainFilm = (currentFilm) => { return { type: 'SET_CURRENT_MAIN_FILM', currentFilm } }
export const getOneFilm = (filmId) => { return { type: 'GET_ONE_FILM', filmId } }
export const addUpcomingFilms = (addedFilms) => { return { type: 'ADD_UPCOMING_FILMS', addedFilms } }
export default mainPageReducer;