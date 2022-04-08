import { filmsAPI } from '../api/api';
//данные для инициализации начального state
let initialState = {
    //Фильмы
    //Данные фильмов
    movieData: '',//данные конкретного фильма
    genres: '', //жанры
    similarMovie: '', //Похожие
    detailsMovie: '', //Детали фильма
    reviews: '',
    //Загрузчики
    isMovieInfoLoading: true,//производится ли загрузка информационной страницы
    isFoundMoviesLoading: true, //производится ли загрузка найденных фильмов

    //Поиск фильмов
    foundMovies: '',//Найденные фильмы при поиске через navbar
    foundPage: 2, //страница найденных фильмов
    foundKey: '',//year10, year20,year22,genre,searchMovie, trand
    searchArea: '', //Строка поиска

    //YouTube ссылки
    ytLinks: ''
}

//редьюсер
let moviePageReducer = (state = initialState, action) => {
    switch (action.type) {
        //ФИЛЬМЫ
        //Инициализация похожих фильмов
        case 'SET_SIMILAR_MOVIE':
            return {
                ...state,
                similarMovie: action.similarMovie
            }
        //Инициализация подробных данных о фильме
        case 'SET_DETAILS_MOVIE':
            return {
                ...state,
                detailsMovie: action.detailsMovie
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
        //инициализируем жанры
        case 'SET_GENRES':
            return {
                ...state,
                genres: action.genres
            }

        ///Инициализация найденных фильмов
        case 'SET_FOUND_MOVIES': {
            return {
                ...state,
                foundMovies: action.foundMovies
            }
        }
        //Инициализация страницы найденных фильмов
        case 'SET_FOUND_PAGE': {
            if (action.foundPage < 1) {
                return {
                    ...state,
                    foundPage: 20
                }
            } else {
                return {
                    ...state,
                    foundPage: action.foundPage
                }
            }
        }
        ////Инициализация ключа (фильм/сериал/жанры/года)
        case 'SET_FOUND_KEY': {
            return {
                ...state,
                foundKey: action.foundKey
            }
        }
        ///Инициализация области поиска
        case 'SET_SEARCH_AREA': {
            return {
                ...state,
                searchArea: action.searchArea
            }
        }
        //Инициализация данных фильма
        case 'SET_MOVIE_DATA': {
            return {
                ...state,
                movieData: action.movieData
            }
        }
        ////Инициализация данных ютуб ссылок
        case 'SET_YOUTUBE_LINKS': {
            return {
                ...state,
                ytLinks: action.ytLinks
            }
        }
        case 'SET_MOVIE_REVIEWS': {
            return {
                ...state,
                reviews: action.reviews
            }
        }
        default: return state
    }
}

//Получение жанров фильмов
export const getMovieGenres = () => {
    return (dispatch) => {
        filmsAPI.getGenres().then(response => {
            dispatch(setGenres(response.data));
        })
    }
}
//Поиск фильмов
export const foundMoviesThunkCreator = (movie) => {
    return (dispatch) => {
        filmsAPI.searchMovie(movie).then(response => {
            dispatch(setFoundMovies(response.data))
        }).then(() => {
            dispatch(setIsFoundMoviesLoading(false));
        })
    }
}
//thunk для получения фильмов информационной страницы(популярных и ожидаемых, а также жанров) Также, передаем id выбранного фильма
export const getMovieThunkCreator = (movieId) => {
    return (dispatch) => {
        filmsAPI.getFilmById(movieId).then(response => {
            dispatch(setMovieData(response.data.movie_results[0]))
        }).then(() => {
            dispatch(setIsMovieInfoLoading(false));
        })
    }
}

export const getVideosMovie = (movieId) => {
    return (dispatch) => {
        filmsAPI.getMovieVideos(movieId).then(response => {
            dispatch(setYouTubeLinks(response));
        })
    }
}
//thunk для получения фильмов по id жанра
export const getMovieWithGenreThunkCreator = (genreId, page) => {
    return (dispatch) => {
        filmsAPI.searchWithGenres(genreId, page).then(response => {
            dispatch(setFoundMovies(response.data))
        }).then(() => {
            dispatch(setIsFoundMoviesLoading(false));
        })
    }
}
//thunk для получения фильмов по годам
export const getMovieWithYearsThunkCreator = (yearFrom, yearTo, page) => {
    return (dispatch) => {
        filmsAPI.searchWithYears(yearFrom, yearTo, page).then(response => {
            dispatch(setFoundMovies(response.data))
        }).then(() => {
            dispatch(setIsFoundMoviesLoading(false));
        })
    }
}
//thunk для получения фильмов по годам
export const getMovieWithTrandThunkCreator = (time) => {
    return (dispatch) => {
        filmsAPI.searchTranding(time).then(response => {
            dispatch(setFoundMovies(response.data))
        }).then(() => {
            dispatch(setIsFoundMoviesLoading(false));
        })
    }
}
//Поиск подобных фильмов
export const getSimilarMovie = (movieId, page) => {
    return (dispatch) => {
        filmsAPI.getSimilarMovie(movieId, page).then(response => {
            dispatch(setSimilarMovie(response.data));
        })
    }
}
export const getMovieReviews = (movieId, page) => {
    return (dispatch) => {
        filmsAPI.getMovieReviews(movieId, page).then(response => {
            dispatch(setMovieReviews(response.data));
        })
    }
}
//Получение подробностей фильма
export const getDetailsMovie = (movieId) => {
    return (dispatch) => {
        filmsAPI.getDetailsMovie(movieId).then(response => {
            dispatch(setDetailsMovie(response));
        }).then(() => {
            dispatch(setIsMovieInfoLoading(false));
        })
    }
}
//Получение всех данных по текущему фильму
export const getAllDetailsMovie = (movieId) => {
    return (dispatch) => {
        filmsAPI.getAllDetailsMovie(movieId).then(response => {
            dispatch(setSimilarMovie(response[0].data));
            dispatch(setGenres(response[1].data));
            dispatch(setYouTubeLinks(response[2].data.results));
            dispatch(setDetailsMovie(response[3].data));
        }).then(() => {
            dispatch(setIsMovieInfoLoading(false));
        })
    }
}


//Action Creators для удобной передачи action
export const setGenres = (genres) => { return { type: 'SET_GENRES', genres } }
export const setIsMovieInfoLoading = (movieLoading) => { return { type: 'SET_IS_MOVIE_INFO_LOADING', movieLoading } }
export const setIsFoundMoviesLoading = (foundMovieLoading) => { return { type: 'SET_IS_FOUND_MOVIES_LOADING', foundMovieLoading } }
export const setFoundMovies = (foundMovies) => { return { type: 'SET_FOUND_MOVIES', foundMovies } }
export const setSearchArea = (searchArea) => { return { type: 'SET_SEARCH_AREA', searchArea } }
export const setMovieData = (movieData) => { return { type: 'SET_MOVIE_DATA', movieData } }
export const setFoundPage = (foundPage) => { return { type: 'SET_FOUND_PAGE', foundPage } }
export const setFoundKey = (foundKey) => { return { type: 'SET_FOUND_KEY', foundKey } }
export const setYouTubeLinks = (ytLinks) => { return { type: 'SET_YOUTUBE_LINKS', ytLinks } }
export const setSimilarMovie = (similarMovie) => { return { type: 'SET_SIMILAR_MOVIE', similarMovie } }
export const setDetailsMovie = (detailsMovie) => { return { type: 'SET_DETAILS_MOVIE', detailsMovie } }
export const setMovieReviews = (reviews) => { return { type: 'SET_MOVIE_REVIEWS', reviews } }
export default moviePageReducer;