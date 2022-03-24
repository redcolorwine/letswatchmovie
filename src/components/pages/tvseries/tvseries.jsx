import { useEffect } from 'react';
import cmedia from './tvseries.module.css';
import preloader from './../../../media/preloaders/preloader.svg';
import FilmItem from './../mainPage/filmItem';
const Tvseries = (props) => {

    useEffect(() => {
        //Запрашиваем данные в случае, если массивы данных пусты
        if (props.trandTVSeries == '') {
            //Загружаем популярные фильмы и ожидаемые(указав страницу 1)
            props.getTrandTV(1);
        }
    }, [])
    if (props.isTVSeriesLoading) {
        return (
            <div className={cmedia.preloader}>
                <img src={preloader} alt="" />
            </div>
        )
    } else {
        console.log(props.trandTVSeries);
        let trandTVSeriesFromServer = props.trandTVSeries.results.map((film) => {
            return (<FilmItem genresNames={props.tvGenres} genres={film.genre_ids} key={film.id} id={film.id} vote={film.vote_average} adult={props.adult} release={film.first_air_date} title={film.name} img={film.backdrop_path != null ? `https://image.tmdb.org/t/p/w500/${film.backdrop_path}` : null} description={film.overview} type='tv' />)
        })
        return (
            <div className={cmedia.tvseries}>
                <h3>Тренды недели:</h3>
                <div className={cmedia.newsBlock}>
                    {trandTVSeriesFromServer}
                </div>

            </div>
        )
    }
}
export default Tvseries;