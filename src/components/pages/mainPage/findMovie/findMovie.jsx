import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FilmItem from '../filmItem';
import cmedia from './findMovie.module.css';

const FindMovie = (props) => {

    const { nameMovie } = useParams();
    useEffect(() => {
      
    }, [])
  
    if (props.isFoundMoviesLoading) {
        return (
            <div>
                LOADING
            </div>
        )
    } else {

        let foundMovies = props.foundMovies.results.map((film) => {
            return (<FilmItem genresNames={props.genres} genres={film.genre_ids} key={film.id} id={film.id} vote={film.vote_average} adult={props.adult} release={film.release_date} title={film.title} img={film.backdrop_path != null ? `https://image.tmdb.org/t/p/w500/${film.backdrop_path}` : null} description={film.overview} />)
        })
        return (
            <div className={cmedia.findMovie}>
                <p>Найдено по запросу {nameMovie}:</p>
                <div className={cmedia.newsBlock}>
                    {foundMovies}
                </div>
            </div>

        )
    }
}
export default FindMovie;