import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usersAPI } from '../../../../api/api';
import cmedia from './movieinfo.module.css';

const MovieInfo = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();


    useEffect(() => {
        usersAPI.getMostPopularFilms().then(response => {
            props.setMostPopularFilms(response.results);
            props.getChosenFilm(id);
            console.log(props.chosenFilm)
            console.log(props.mostPopularFilms)
            setIsLoading(false);
        })


    }, [])

    if (isLoading) return (<div>
        loading...
    </div>)
    return (

        <div className={cmedia.movieInfo}>
            <div className={cmedia.title}>
                <h4>{props.chosenFilm[0].title}</h4>
                <p>Дата выхода: {props.chosenFilm[0].release_date}</p>
                <p>Возрастные ограничения: {props.chosenFilm[0].adult ? <span>18+</span> : <span>нет</span>}</p>
                <img src={`https://image.tmdb.org/t/p/w500/${props.chosenFilm[0].backdrop_path}`} alt="" />
            </div>

            <div className={cmedia.description}>
                <p className={cmedia.vote}>Рейтинг: {props.chosenFilm[0].vote_average}</p>
                <p className={cmedia.about}>{props.chosenFilm[0].overview}</p>
            </div>

        </div>

    )
}
//https://image.tmdb.org/t/p/w500/ + props.img
export default MovieInfo;