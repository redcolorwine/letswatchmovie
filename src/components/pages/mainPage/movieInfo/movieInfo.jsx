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

        })
        usersAPI.getGenres().then(response => {
            props.setGenres(response);
            setIsLoading(false);
        })

    }, [])


    if (isLoading) return (<div>
        loading...
    </div>)
    else {

        let genresNames = [];
        for (let j = 0; j < props.chosenFilm[0].genre_ids.length; j++) {
            for (let i = 0; i < props.genresNames.genres.length; i++) {
                if (props.chosenFilm[0].genre_ids[j] === props.genresNames.genres[i].id) {
                    genresNames.push(props.genresNames.genres[i].name)
                }
            }
        }

        let genres = genresNames.map((genre) => {

            return (<span key={genre}>{genre} </span>)

        })

        return (

            <div className={cmedia.movieInfo}>
                <div className={cmedia.title}>
                    <h4>{props.chosenFilm[0].title}</h4>
                    <p>Дата выхода: {props.chosenFilm[0].release_date}</p>
                    <p>Возрастные ограничения: {props.chosenFilm[0].adult ? <span>18+</span> : <span>нет</span>}</p>
                    <img src={`https://image.tmdb.org/t/p/w500/${props.chosenFilm[0].backdrop_path}`} alt="" />
                </div>

                <div className={cmedia.description}>
                    <p>Жанр: {genres}</p>
                    <p className={cmedia.vote}>Рейтинг: {props.chosenFilm[0].vote_average}</p>
                    <p className={cmedia.about}>{props.chosenFilm[0].overview}</p>
                </div>

            </div>

        )
    }
}

export default MovieInfo;