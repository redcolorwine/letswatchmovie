import { usersAPI } from '../api/api';
//данные для инициализации начального state
let initialState = {
    //Фильмы
    //Данные фильмов
    mostPopularFilms: '', //популярные фильмы
    upcommingFilms: '', //ожидаемые фильмы
    movieData: '',//данные конкретного фильма
    genres: '', //жанры
    currentMainFilm: 5, //выбранный фильм для отображения на главной страницы
    currentUpcomingFilmPage: 2, //текущая страница для последующей загрузки ожидаемых фильмов (при нажатии на кнопку "далее" на главной странице)
    similarMovie: '',
    detailsMovie: '',

    //Загрузчики
    isMainPageLoading: true, //производится ли загрузка главной страницы
    isMovieInfoLoading: true,//производится ли загрузка информационной страницы
    isFoundMoviesLoading: true, //производится ли загрузка найденных фильмов

    //Поиск фильмов
    foundMovies: '',//Найденные фильмы при поиске через navbar
    foundPage: 2, //страница найденных фильмов
    foundKey: '',//year10, year20,year22,genre,searchMovie, trand
    searchArea: '', //Строка поиска

    //Сериалы
    isTVInfoLoading: true,
    isTVSeriesLoading: true,
    trandTVSeries: '',
    tvGenres: '',
    tvData: '',
    topRatedTv: '',
    similarTv: '',
    detailsTv: '',
    //YouTube ссылки
    ytLinks: ''
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
        case 'SET_SIMILAR_MOVIE':
            return {
                ...state,
                similarMovie: action.similarMovie
            }
        case 'SET_DETAILS_MOVIE':
            return {
                ...state,
                detailsMovie: action.detailsMovie
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
        case 'SET_FOUND_KEY': {
            return {
                ...state,
                foundKey: action.foundKey
            }
        }
        case 'SET_SEARCH_AREA': {
            return {
                ...state,
                searchArea: action.searchArea
            }
        }
        case 'SET_MOVIE_DATA': {
            return {
                ...state,
                movieData: action.movieData
            }
        }
        //СЕРИАЛЫ    
        case 'SET_TRAND_TVSERIES':
            return {
                ...state,
                trandTVSeries: action.trandTVSeries
            }
        case 'SET_DETAILS_TV':
            return {
                ...state,
                detailsTv: action.detailsTv
            }
        case 'SET_TV_GENRES':
            return {
                ...state,
                tvGenres: action.tvGenres
            }
        case 'SET_TV_DATA': {
            return {
                ...state,
                tvData: action.tvData
            }
        }
        case 'SET_SIMILAR_TV': {
            return {
                ...state,
                similarTv: action.similarTv
            }
        }
        case 'SET_TOP_RATED_TV': {
            return {
                ...state,
                topRatedTv: action.topRatedTv
            }
        }
        case 'SET_IS_TVSERIES_LOADING': {
            return {
                ...state,
                isTVSeriesLoading: action.seriesLoading
            }
        }
        case 'SET_IS_TV_INFO_LOADING': {
            return {
                ...state,
                isTVInfoLoading: action.tvLoading
            }
        }

        case 'SET_YOUTUBE_LINKS': {
            return {
                ...state,
                ytLinks: action.ytLinks
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
            dispatch(setMostPopularFilms(response[0].data));
            dispatch(setGenres(response[1].data))
            dispatch(setUpcommingFilms(response[2].data));

        }).then(() => {
            //после того как данные проинициализированы, разрешаем загрузку страницы
            dispatch(setIsLoading(false));

        })
    }

}
export const getTrandTVSeries = (page) => {
    return (dispatch) => {
        usersAPI.getTVSeries(page).then(response => {
            dispatch(setTrandTVSeries(response[0].data));
            dispatch(setTVGenres(response[1].data));
        }).then(() => {
            dispatch(setIsTvSeriesLoading(false));
        })
    }
}
export const getTVGenres = () => {
    return (dispatch) => {
        usersAPI.getTVgenres().then(response => {
            dispatch(setTVGenres(response.data))
        })
    }
}

export const getMovieGenres = () => {
    return (dispatch) => {
        usersAPI.getGenres().then(response => {
            dispatch(setGenres(response.data));
        })
    }
}
export const getTopRatedTV = (page) => {
    return (dispatch) => {
        usersAPI.searchTopRatedTV(page).then(response => {
            dispatch(setTopRatedTv(response.data));
        })
    }
}
//thunk для получения следующей страницы ожидаемых фильмов и последующего добавления их в массив ожидаемых фильмов
export const addUpcomingFilmsThunkCreator = (page) => {
    return (dispatch) => {
        usersAPI.getUpcomingFilms(page).then(response => {
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
//thunk для получения фильмов информационной страницы(популярных и ожидаемых, а также жанров) Также, передаем id выбранного фильма
export const getMovieThunkCreator = (movieId) => {
    return (dispatch) => {
        usersAPI.getFilmById(movieId).then(response => {
            dispatch(setMovieData(response.data.movie_results[0]))
        }).then(() => {
            dispatch(setIsMovieInfoLoading(false));
        })
    }
}
export const getTVThunkCreator = (tvId) => {
    return (dispatch) => {

        usersAPI.getTVbyID(tvId).then(response => {
            dispatch(setTVData(response.data.tv_results[0]))
        }).then(() => {

            dispatch(setIsTVInfoLoading(false));
        })
    }
}
export const getVideosTV = (tvId) => {
    return (dispatch) => {
        usersAPI.getTvVideos(tvId).then(response => {

            dispatch(setYouTubeLinks(response));
        })
    }
}
export const getVideosMovie = (movieId) => {
    return (dispatch) => {
        usersAPI.getMovieVideos(movieId).then(response => {
            dispatch(setYouTubeLinks(response));
        })
    }
}
//thunk для получения фильмов по id жанра
export const getMovieWithGenreThunkCreator = (genreId, page) => {
    return (dispatch) => {
        usersAPI.searchWithGenres(genreId, page).then(response => {
            dispatch(setFoundMovies(response.data))
        }).then(() => {
            dispatch(setIsFoundMoviesLoading(false));
        })
    }
}
//thunk для получения фильмов по годам
export const getMovieWithYearsThunkCreator = (yearFrom, yearTo, page) => {
    return (dispatch) => {
        usersAPI.searchWithYears(yearFrom, yearTo, page).then(response => {
            dispatch(setFoundMovies(response.data))
        }).then(() => {
            dispatch(setIsFoundMoviesLoading(false));
        })
    }
}
//thunk для получения фильмов по годам
export const getMovieWithTrandThunkCreator = (time) => {
    return (dispatch) => {
        usersAPI.searchTranding(time).then(response => {
            dispatch(setFoundMovies(response.data))
        }).then(() => {
            dispatch(setIsFoundMoviesLoading(false));
        })
    }
}

export const getSimilarMovie = (movieId, page) => {
    return (dispatch) => {
        debugger;
        usersAPI.getSimilarMovie(movieId, page).then(response => {
            dispatch(setSimilarMovie(response.data));
        })
    }
}
export const getSimilarTv = (tvId, page) => {
    return (dispatch) => {
        usersAPI.getSimilarTV(tvId, page).then(response => {
            dispatch(setSimilarTv(response.data));
        })
    }
}
export const getDetailsMovie = (movieId) => {
    return (dispatch) => {
        usersAPI.getDetailsMovie(movieId).then(response => {
            dispatch(setDetailsMovie(response));
        })
    }
}
export const getDetailsTv = (tvId) => {
    return (dispatch) => {
        usersAPI.getDetailsTv(tvId).then(response => {
            dispatch(setDetailsTv(response));
        })
    }
}
//Action Creators для удобной передачи action
export const setMostPopularFilms = (mostPopularFilms) => { return { type: 'SET_MOST_POPULAR_FILMS', mostPopularFilms } }
export const setUpcommingFilms = (upcommingFilms) => { return { type: 'SET_UPCOMING_FILMS', upcommingFilms } }
export const setTrandTVSeries = (trandTVSeries) => { return { type: 'SET_TRAND_TVSERIES', trandTVSeries } }
export const setGenres = (genres) => { return { type: 'SET_GENRES', genres } }
export const setTVGenres = (tvGenres) => { return { type: 'SET_TV_GENRES', tvGenres } }
export const setIsLoading = (loading) => { return { type: 'SET_IS_LOADING', loading } }
export const setIsMovieInfoLoading = (movieLoading) => { return { type: 'SET_IS_MOVIE_INFO_LOADING', movieLoading } }
export const setIsTVInfoLoading = (isTVInfoLoading) => { return { type: 'SET_IS_TV_INFO_LOADING', isTVInfoLoading } }
export const setIsFoundMoviesLoading = (foundMovieLoading) => { return { type: 'SET_IS_FOUND_MOVIES_LOADING', foundMovieLoading } }
export const setIsTvSeriesLoading = (seriesLoading) => { return { type: 'SET_IS_TVSERIES_LOADING', seriesLoading } }
export const setCurrentMainFilm = (currentFilm) => { return { type: 'SET_CURRENT_MAIN_FILM', currentFilm } }
export const addUpcomingFilms = (addedFilms) => { return { type: 'ADD_UPCOMING_FILMS', addedFilms } }
export const setCurrentUpcomingPage = (currentPage) => { return { type: 'SET_UPCOMING_CURRENT_PAGE', currentPage } }
export const setFoundMovies = (foundMovies) => { return { type: 'SET_FOUND_MOVIES', foundMovies } }
export const setSearchArea = (searchArea) => { return { type: 'SET_SEARCH_AREA', searchArea } }
export const setMovieData = (movieData) => { return { type: 'SET_MOVIE_DATA', movieData } }
export const setTVData = (tvData) => { return { type: 'SET_TV_DATA', tvData } }
export const setTopRatedTv = (topRatedTv) => { return { type: 'SET_TOP_RATED_TV', topRatedTv } }
export const setFoundPage = (foundPage) => { return { type: 'SET_FOUND_PAGE', foundPage } }
export const setFoundKey = (foundKey) => { return { type: 'SET_FOUND_KEY', foundKey } }
export const setYouTubeLinks = (ytLinks) => { return { type: 'SET_YOUTUBE_LINKS', ytLinks } }
export const setSimilarMovie = (similarMovie) => { return { type: 'SET_SIMILAR_MOVIE', similarMovie } }
export const setSimilarTv = (similarTv) => { return { type: 'SET_SIMILAR_TV', similarTv } }
export const setDetailsMovie = (detailsMovie) => { return { type: 'SET_DETAILS_MOVIE', detailsMovie } }
export const setDetailsTv = (detailsTv) => { return { type: 'SET_DETAILS_TV', detailsTv } }
export default mainPageReducer;