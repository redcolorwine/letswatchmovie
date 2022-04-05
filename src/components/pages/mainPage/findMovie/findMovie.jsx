import { useParams } from 'react-router-dom';
import FilmItem from '../filmItem';
import cmedia from './findMovie.module.css';
import preloader from './../../../../media/preloaders/preloader.svg';
//Страница найденных запросов
const FindMovie = (props) => {

    //Достаем имя запроса из url
    const { nameMovie } = useParams();
    //В зависимости от типа запроса, кнопки переключения страниц будут выполнять разные функции
    //Т.Е. если запрос был по жанрам, то стрелки будут переключать страницы только найденных по жанрам фильмов и т.д.
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
        //Полученнные данные запроса преобразуем в элементы FilmItem
        let foundMovies = props.foundMovies.results.map((film) => {
            return (<FilmItem genresNames={props.genres} genres={film.genre_ids} key={film.id} id={film.id} vote={film.vote_average} adult={props.adult} release={film.release_date ? film.release_date : film.first_air_date} title={film.title ? film.title : film.name} img={film.backdrop_path != null ? `https://image.tmdb.org/t/p/w500/${film.backdrop_path}` : null} description={film.overview} type={film.name ? 'tv' : 'movie'} />)
        })

        return (

            <div className={cmedia.findMovie}>
                <h3>Найдено по запросу "{nameMovie}":</h3>
                <div className={cmedia.newsBlock}>
                    {foundMovies}
                </div>

                {/* Стрелки переключения будут отображаться в зависимости от полученного ключа, так как не каждый запрос имеет атрибут page для переключения страниц */}
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