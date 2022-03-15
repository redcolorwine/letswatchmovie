import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FilmItem from './filmItem';
import cmedia from './main.module.css';
import preloader from './../../../media/preloaders/preloader.svg';

const Main = (props) => {

    let history = useNavigate();
    const onItemClick = () => {
        history('movie/' + props.mostPopularFilms[props.currentMainFilm].id);
    }

    useEffect(() => {
        props.getFilmsForMainPage(1);
        // props.getUpcommingFilms();
        // props.setGenres();

    }, [])

    if (props.isMainPageLoading) {
        return (

            <div className={cmedia.preloader}>
                <img src={preloader} alt="" />
            </div>
        )
    } else {

        let popularFilmsFromServer = props.mostPopularFilms.map((film) => {
            return (<FilmItem genresNames={props.genres} genres={film.genre_ids} key={film.id} id={film.id} vote={film.vote_average} adult={props.adult} release={film.release_date} title={film.title} img={`https://image.tmdb.org/t/p/w500/${film.backdrop_path}`} description={film.overview} />)
        })
        let upcommingFilmsFromServer = props.upcommingFilms.map((film) => {
            return (<FilmItem genresNames={props.genres} genres={film.genre_ids} key={film.id} id={film.id} vote={film.vote_average} adult={props.adult} release={film.release_date} title={film.title} img={`https://image.tmdb.org/t/p/w500/${film.backdrop_path}`} description={film.overview} />)
        })
        let genresNames = [];

        for (let j = 0; j < props.mostPopularFilms[props.currentMainFilm].genre_ids.length; j++) {
            for (let i = 0; i < props.genres.genres.length; i++) {
                if (props.mostPopularFilms[props.currentMainFilm].genre_ids[j] === props.genres.genres[i].id) {
                    genresNames.push(props.genres.genres[i].name)
                }
            }
        }

        let genres = genresNames.map((genre) => {
            return (<span key={genre}>{genre} </span>)
        })

        return (
            <div className={cmedia.main}>
                <div className={cmedia.mainBlock}>

                    <button className={cmedia.arrowLeft} onClick={() => {
                        if (props.currentMainFilm >= 1) props.setCurrentMainFilm(props.currentMainFilm - 1);
                        else props.setCurrentMainFilm(props.mostPopularFilms.length - 1)
                    }}>&lt;</button>

                    <div className={cmedia.centerBlock}>
                        <img className={cmedia.animateBlock} src={`https://image.tmdb.org/t/p/w500/${props.mostPopularFilms[props.currentMainFilm].backdrop_path}`} onClick={onItemClick} alt="" />
                        <div className={cmedia.description}>
                            <h1>{props.mostPopularFilms[props.currentMainFilm].title}</h1>
                            <p>Дата выхода: {props.mostPopularFilms[props.currentMainFilm].release_date}</p>
                            <p>Жанр: {genres}</p>
                            <p>{props.mostPopularFilms[props.currentMainFilm].overview}</p>
                            <p>Оценка TMDB: {props.mostPopularFilms[props.currentMainFilm].vote_average}</p>
                            <button>Смотреть сейчас</button>
                        </div>
                    </div>

                    <button className={cmedia.arrowRight} onClick={() => {
                        if (props.currentMainFilm < props.mostPopularFilms.length - 1) props.setCurrentMainFilm(props.currentMainFilm + 1)
                        else props.setCurrentMainFilm(0)
                    }}>	&gt;</button>


                </div>

                <div className={cmedia.actualLabel}>
                    <h1>Актуальные новинки: </h1>
                </div>

                <div className={cmedia.newsBlock}>
                    {popularFilmsFromServer}
                </div>

                <div className={cmedia.actualLabel}>
                    <h1>Самое ожидаемое: </h1>
                </div>
                <div className={cmedia.newsBlock}>
                    {upcommingFilmsFromServer}
                </div>
                <button className={cmedia.down} onClick={() => { props.addUpcomingFilms(4); console.log(props.upcommingFilms) }}>&darr;</button>
            </div>
        )
    }
}

export default Main;
