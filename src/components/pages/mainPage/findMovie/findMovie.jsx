import { useEffect } from 'react';
import FilmItem from '../filmItem';
import cmedia from './findMovie.module.css';

const FindMovie = (props) => {
    useEffect(() => {
        console.log(props.foundMovies)
    }, [])





    if (props.isFoundMoviesLoading) {
        return (
            <div>
                LOADING
            </div>
        )
    } else {
        // let foundMovies = props.foundMovies.results.map((film) => {
        //     return (<FilmItem key={film.id} id={film.id} vote={film.vote_average} adult={props.adult} release={film.release_date} title={film.title} img={film.backdrop_path != null ? `https://image.tmdb.org/t/p/w500/${film.backdrop_path}` : null} description={film.overview} />)
        // })
        return (
            <div className={cmedia.findMovie}>
                {/* {foundMovies} */}
            </div>
        )
    }
}
export default FindMovie;