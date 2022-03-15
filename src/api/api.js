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
        return axios.get('https://api.themoviedb.org/3/discover/movie?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate')
            .then(response => {
                return response.data
            });
    },
    getFilmsForMainPage(page = 1) {
        return axios.all([
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'),
            axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU'),
            axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU&page=${page}`)
        ]).then(response => {
            return response
        })
    },
    getFilmsForMovieInfo() {
        return axios.all([
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'),
            axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU'),
            axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU&page=1')
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
    }
}
//  instance.get(`discover/movie?sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
//https://api.themoviedb.org/3/discover/movie?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate