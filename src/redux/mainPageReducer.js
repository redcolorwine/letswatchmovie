import { filmsAPI } from '../api/api';
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
    similarMovie: '', //Похожие
    detailsMovie: '', //Детали фильма

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
let mainPageReducer = (state = initialState, action) => {
    switch (action.type) {
        //ФИЛЬМЫ
        //инициализация популярных фильмов
        case 'SET_MOST_POPULAR_FILMS':
            return {
                ...state,
                mostPopularFilms: action.mostPopularFilms
            }
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
//Получение жанров фильмов
export const getMovieGenres = () => {
    return (dispatch) => {
        filmsAPI.getGenres().then(response => {
            dispatch(setGenres(response.data));
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
//thunk для получения следующей страницы ожидаемых фильмов и последующего добавления их в массив ожидаемых фильмов
export const addUpcomingFilmsThunkCreator = (page) => {
    return (dispatch) => {
        filmsAPI.getUpcomingFilms(page).then(response => {
            dispatch(addUpcomingFilms(response))
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
//Поиск похожих сериалов
export const getSimilarTv = (tvId, page) => {
    return (dispatch) => {
        filmsAPI.getSimilarTV(tvId, page).then(response => {
            dispatch(setSimilarTv(response.data));
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
export const setFoundByFilterTV = (foundByFilterTV) => { return { type: 'SET_FOUND_BY_FILTER_TV', foundByFilterTV } }
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