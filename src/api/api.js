import *as axios from 'axios';

//создаем настройки для запросов для переиспользования
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        "api-key": "2c395216a9e2efaac337ffbc09ff1ee8",
        "language": "ru-RU"
    }
});

export const usersAPI = {
    getMostPopularFilms() {
        return axios.get('https://api.themoviedb.org/3/discover/movie?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_watch_monetization_types=flatrate')
            .then(response => {
                return response.data
            });
    },
    getFilmsForMainPage(page = 1) {
        return axios.all([
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_watch_monetization_types=flatrate'),
            axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU'),
            axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU&page=${page}`)
        ]).then(response => {
            return response
        })
    },
    getFilmsForMovieInfo(page = 1) {
        return axios.all([
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_watch_monetization_types=flatrate'),
            axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU'),
            axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU&page=${page}`)
        ]).then(response => {
            return response
        })
    },
    getUpcomingFilms(page = 1) {
        return axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU&page=${page}`)
            .then(response => {
                return response.data
            })
    },
    getGenres() {
        return axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU').then(response => {
            return response.data
        });
    },
    searchMovie(query = 'Путешествие') {
        return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU&query=${query}`).then(response => {
            return response;
        })
    },
    async getFilmById(filmId) {
        try {
            var response = await axios.get(`https://api.themoviedb.org/3/movie/${filmId}/external_ids?api_key=2c395216a9e2efaac337ffbc09ff1ee8`)
        } catch (error) {
            console.log(error)
        }
        try {
            var responseTwo = await axios.get(`https://api.themoviedb.org/3/find/${response.data.imdb_id}?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU&external_source=imdb_id`)
        } catch (error) {
            console.log(error)
        }
        return responseTwo;
    },
    searchWithGenres(genreId) {
        return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_genres=${genreId}&with_watch_monetization_types=flatrate`).then(response => {
            return response;
        })
    },
    searchWithYears(yearFrom = 2010, yearTo = 2020) {
        return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&primary_release_date.gte=${yearFrom}&primary_release_date.lte=${yearTo}&with_genres=16&with_watch_monetization_types=flatrate`).then(response => {
            return response;
        })
    },
    searchTranding(time = "day") {
        return axios.get(`https://api.themoviedb.org/3/trending/movie/${time}?api_key=2c395216a9e2efaac337ffbc09ff1ee8`).then(response => {
            return response;
        })
    }
}
