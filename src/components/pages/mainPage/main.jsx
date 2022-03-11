import { useEffect, useState } from 'react';
import { usersAPI } from '../../../api/api';
import FilmItem from './filmItem';
import cmedia from './main.module.css';


const Main = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    let randomFilm;

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    useEffect(() => {
        usersAPI.getMostPopularFilms().then(response => {
            props.setMostPopularFilms(response.results);

            setIsLoading(false);
        })
    }, [])

    if (isLoading) {
        return (
            <div>LOADING...</div>
        )
    }
    let popularFilmsFromServer = props.mostPopularFilms.map((film) => {
        return (<FilmItem key={film.id} id={film.id} vote={film.vote_average} adult={props.adult} release={film.release_date} title={film.title} img={`https://image.tmdb.org/t/p/w500/${film.backdrop_path}`} description={film.overview} />)
    })
    randomFilm = getRandomInt(20);

    return (
        <div className={cmedia.main}>
            <div className={cmedia.mainBlock}>
                <img src={`https://image.tmdb.org/t/p/w500/${props.mostPopularFilms[randomFilm].backdrop_path}`} alt="" />
                <div className={cmedia.description}>
                    <h1>{props.mostPopularFilms[randomFilm].title}</h1>
                    <p>{props.mostPopularFilms[randomFilm].overview}</p>
                    <button>Смотреть сейчас</button>
                </div>

            </div>

            <div className={cmedia.newsBlock}>
                {popularFilmsFromServer}
            </div>
        </div>
    )
}

export default Main;
