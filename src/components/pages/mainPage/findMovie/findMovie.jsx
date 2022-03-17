import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usersAPI } from '../../../../api/api';
import FilmItem from '../filmItem';
import cmedia from './findMovie.module.css';

const FindMovie = (props) => {

    const { nameMovie } = useParams();
    useEffect(() => {
        // props.searchMovies(props.searchArea)
    }, [])
    const testBut = () => {
        let rez;
        usersAPI.getFilmById(51273).then(response => {
            console.log(response)
        })

        //     usersAPI.getFilmById(51273).then(response => {
        //         rez = response;
        //     }).then(() => {
        //         axios.get(`https://api.themoviedb.org/3/find/${rez}?api_key=2c395216a9e2efaac337ffbc09ff1ee8&language=ru-RU&external_source=imdb_id`).then(res => {
        //             console.log(res)
        //         })
        //     })
    }
    if (props.isFoundMoviesLoading) {
        return (
            <div>
                LOADING
            </div>
        )
    } else {

        // console.log(props.searchArea)
        console.log(props.searchArea)
        console.log(props.foundMovies.results)
        let foundMovies = props.foundMovies.results.map((film) => {
            return (<FilmItem genresNames={props.genres} genres={film.genre_ids} key={film.id} id={film.id} vote={film.vote_average} adult={props.adult} release={film.release_date} title={film.title} img={film.backdrop_path != null ? `https://image.tmdb.org/t/p/w500/${film.backdrop_path}` : null} description={film.overview} />)
        })
        return (
            <div className={cmedia.findMovie}>
                <h1>{nameMovie}</h1>
                <button onClick={testBut}></button>
                <div className={cmedia.newsBlock}>
                    {foundMovies}
                </div>
            </div>

        )
    }
}
export default FindMovie;