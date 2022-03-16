import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cmedia from './movieinfo.module.css';
import preloader from './../../../../media/preloaders/preloader.svg';
const MovieInfo = (props) => {

    //Получаем ID из URL
    const { id } = useParams();

    //После отрисовки компоненты получаем данные выбранного фильм полученные из API
    useEffect(() => {
        // props.getChosenFilm(id, props.currentUpcomingFilmPage - 1);
        props.getChosenFilm(id,props.upcommingFilms.page)
    }, [])

    //Если данные еще не получены, отображаем загрузку страницы preloader
    if (props.isMovieInfoLoading) return (<div className={cmedia.preloader}>
        <img src={preloader} alt="" />
    </div>)

    else {
        //Иначе загружаем основные данные
        //Массив для имен жанров(хранятся в виде объектов{id:1,name:'any'})
        let genresNames = [];

        //Сверяем ID жанров текущего главного фильма с ID жанров API сервера и если ID совпадают, то загружаем их имена в массив genresNames
        for (let j = 0; j < props.chosenFilm[0].genre_ids.length; j++) {
            for (let i = 0; i < props.genresNames.genres.length; i++) {
                if (props.chosenFilm[0].genre_ids[j] === props.genresNames.genres[i].id) {
                    genresNames.push(props.genresNames.genres[i].name)
                }
            }
        }

        //Создаем блоки span из имен жанров
        let genres = genresNames.map((genre) => {
            return (<span key={genre}>{genre} </span>)
        })

        //Отрисовка
        return (
            <div className={cmedia.movieInfo}>

                <div className={cmedia.title}>
                    {/* <h3>page: {props.upcommingFilms.page}</h3> */}
                    <h4>{props.chosenFilm[0].title}</h4>
                    <p>Дата выхода: <span>{props.chosenFilm[0].release_date}</span> </p>
                    <p>Жанр: <span>{genres}</span></p>
                    <p>Возрастные ограничения: {props.chosenFilm[0].adult ? <span>18+</span> : <span>нет</span>}</p>
                    <img src={`https://image.tmdb.org/t/p/w500/${props.chosenFilm[0].backdrop_path}`} alt="" />
                </div>

                <div className={cmedia.description}>
                    <p className={cmedia.vote}>Рейтинг TMDB: <span>{props.chosenFilm[0].vote_average != 0 ? props.chosenFilm[0].vote_average : 'ожидается'}</span> </p>
                    <p className={cmedia.about}>{props.chosenFilm[0].overview}</p>
                </div>

            </div>
        )
    }
}

export default MovieInfo;