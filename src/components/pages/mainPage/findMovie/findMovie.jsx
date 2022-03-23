import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FilmItem from '../filmItem';
import cmedia from './findMovie.module.css';
import preloader from './../../../../media/preloaders/preloader.svg';
const FindMovie = (props) => {

    const { nameMovie } = useParams();
    useEffect(() => {

    }, [])
    const letfClick = () => {
        props.setFoundPage(props.foundPage - 1);
        switch (props.foundKey.name) {
            case 'genre':
                props.searchMoviesWithGenre(props.foundKey.id, props.foundPage);
                break;
            case 'year90':
                props.searchMovieWithYears(1990, 1999, props.foundPage);
                break;
            case 'year10':
                props.searchMovieWithYears(2000, 2009, props.foundPage);
                break;
            case 'year20':
                props.searchMovieWithYears(2010, 2019, props.foundPage);
                break;
            case 'year22':
                props.searchMovieWithYears(2019, 2022, props.foundPage);
                break;
            default: alert('404')
        }
    }
    const rightClick = () => {
        props.setFoundPage(props.foundPage + 1);
        switch (props.foundKey.name) {
            case 'genre':
                props.searchMoviesWithGenre(props.foundKey.id, props.foundPage);
                break;
            case 'year90':
                props.searchMovieWithYears(1990, 1999, props.foundPage);
                break;
            case 'year10':
                props.searchMovieWithYears(2000, 2009, props.foundPage);
                break;
            case 'year20':
                props.searchMovieWithYears(2010, 2019, props.foundPage);
                break;
            case 'year22':
                props.searchMovieWithYears(2019, 2022, props.foundPage);
                break;
            default: alert('404')
        }
    }
    if (props.isFoundMoviesLoading) {
        return (
            <div className={cmedia.preloader}>
                <img src={preloader} alt="" />
            </div>
        )
    } else {
        console.log((props.foundKey))
        let foundMovies = props.foundMovies.results.map((film) => {
            return (<FilmItem genresNames={props.genres} genres={film.genre_ids} key={film.id} id={film.id} vote={film.vote_average} adult={props.adult} release={film.release_date} title={film.title} img={film.backdrop_path != null ? `https://image.tmdb.org/t/p/w500/${film.backdrop_path}` : null} description={film.overview} />)
        })
        return (
            <div className={cmedia.findMovie}>
                <h3>Найдено по запросу "{nameMovie}":</h3>
                <div className={cmedia.newsBlock}>
                    {foundMovies}

                </div>
                {(props.foundKey.name == 'genre' || props.foundKey.name == 'year90' || props.foundKey.name == 'year10' || props.foundKey.name == 'year20' || props.foundKey.name == 'year22') && <>
                    <button className={cmedia.down} onClick={letfClick}>&larr;</button>
                    <button className={cmedia.down} onClick={rightClick}>&rarr;</button>
                </>
                }

            </div>

        )
    }
}
export default FindMovie;