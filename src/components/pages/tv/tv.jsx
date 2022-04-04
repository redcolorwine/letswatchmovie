import { useEffect } from 'react';
import cmedia from './tv.module.css';
import React from 'react';
import preloader from './../../../media/preloaders/preloader.svg';
import FilmItem from './../mainPage/filmItem';
import { usersAPI } from '../../../api/api';
const TV = (props) => {

    useEffect(() => {
        //Запрашиваем данные в случае, если массивы данных пусты
        // props.getGenres();
        props.getTopRated(1);
        props.getTrandTV(1);
    }, [])
    let genreRef = React.createRef();
    let yearFromRef = React.createRef();
    let yearToRef = React.createRef();
    let sortRef = React.createRef();
    //Отправляем в state значение выбранной квартиры
    const onChangeGenre = () => {
        // props.selectFlat(flatRef.current.value);
    }
    //Отправляем в state значение выбранной улицы
    const onChangeYearFrom = () => {
        // props.selectStreet(genreRef.current.value);
    }
    const onChangeYearTo = () => {
        // props.selectStreet(genreRef.current.value);
    }
    //Отправляем в state значение выбранного дома
    const onChangeSortBy = () => {
        // props.selectHouse(housesRef.current.value);
    }
    if (props.isTVSeriesLoading) {
        return (
            <div className={cmedia.preloader}>
                <img src={preloader} alt="" />
            </div>
        )
    } else {
        let genresNames = props.tvGenres.genres.map((genre) => {
            return (<option value={genre.id} id={genre.id} key={genre.id}>{genre.name}</option>)
        })
        const onSearch = () => {
            props.getTVByFilter(genreRef.current.value, yearFromRef.current.value, yearToRef.current.value, sortRef.current.value, 1);
        }
        let foundTV = '';
        if (props.foundByFilterTV != '') {
            foundTV = props.foundByFilterTV.results.map((film) => {
                return (<FilmItem genresNames={props.tvGenres} genres={film.genre_ids} key={film.id} id={film.id} vote={film.vote_average} adult={props.adult} release={film.first_air_date} title={film.name} img={film.backdrop_path != null ? `https://image.tmdb.org/t/p/w500/${film.backdrop_path}` : null} description={film.overview} type='tv' />)
            })
        }
        let trandTVSeriesFromServer = props.trandTVSeries.results.map((film) => {
            return (<FilmItem genresNames={props.tvGenres} genres={film.genre_ids} key={film.id} id={film.id} vote={film.vote_average} adult={props.adult} release={film.first_air_date} title={film.name} img={film.backdrop_path != null ? `https://image.tmdb.org/t/p/w500/${film.backdrop_path}` : null} description={film.overview} type='tv' />)
        })
        let topRatedFromServer = props.topRatedTv.results.map((film) => {
            return (<FilmItem genresNames={props.tvGenres} genres={film.genre_ids} key={film.id} id={film.id} vote={film.vote_average} adult={props.adult} release={film.first_air_date} title={film.name} img={film.backdrop_path != null ? `https://image.tmdb.org/t/p/w500/${film.backdrop_path}` : null} description={film.overview} type='tv' />)
        })
        return (
            <div className={cmedia.tvseries}>
                <h3>Поиск телешоу по фильтрам:</h3>
                <div className={cmedia.search}>
                    <select ref={genreRef} placeholder="Жанр">
                        {genresNames}
                    </select>
                    <input type='text' id="yearFrom" ref={yearFromRef} onChange={() => { }} autoFocus={false} name="yearFrom" placeholder="год с" />
                    <input type='text' id="yearTo" ref={yearToRef} onChange={() => { }} autoFocus={false} name="yearTo" placeholder="год по" />
                    <select id="sortby" ref={sortRef} placeholder="Сортировка">
                        <option value="popularity.asc">По популярности(возрастанию)</option>
                        <option value="popularity.desc">По популярности(убыванию)</option>
                        <option value="first_air_date.asc"> По дате выхода(возрастанию)</option>
                        <option value="first_air_date.desc"> По дате выхода(убыванию)</option>
                        <option value="vote_average.asc">По оценке(возрастанию)</option>
                        <option value="vote_average.desc">По оценке(убыванию)</option>
                    </select>
                    <input type="button" value="Поиск" onClick={onSearch} />
                </div>
                <div className={cmedia.newsBlock}>
                    {foundTV != '' ? foundTV : <p>Ничего не найдено</p>}
                </div>
                <h3>Популярное:</h3>
                <div className={cmedia.newsBlock}>
                    {trandTVSeriesFromServer}
                </div>
                <h3>С высоким рейтингом:</h3>
                <div className={cmedia.newsBlock}>
                    {topRatedFromServer}
                </div>
            </div>
        )
    }
}
export default TV;