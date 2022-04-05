import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import cmedia from './movieinfo.module.css';
import preloader from './../../../../media/preloaders/preloader.svg';
import FilmItem from '../filmItem';
const MovieInfo = (props) => {
    let location = useLocation();
    //Получаем ID из URL
    const { id } = useParams();
    //При получении фильма, вызывается запрос данных конкретного фильма по id
    //В зависимости useEffect указан url адрес, так как нужно производить ререндер страницы при изменении id url'а
    useEffect(() => {
        props.getAllDetails(id);
    }, [location.pathname])

    //Если данные еще не получены, отображаем загрузку страницы preloader
    if (props.isMovieInfoLoading) return (<div className={cmedia.preloader}>
        <img src={preloader} alt="" />
    </div>)

    else if (props.detailsMovie != undefined) {

        //Иначе загружаем основные данные
        //Массив для имен жанров(хранятся в виде объектов{id:1,name:'any'})
        let genresNames = [];
        for (let i = 0; i < props.detailsMovie.genres.length; i++) {
            genresNames.push(props.detailsMovie.genres[i].name)
        }

        //Создаем фреймы из ютуб ссылок для просмотра трейлеров фильмов
        let linksYouTube = props.ytLinks.map(el => {
            return (<><iframe title="linksFrame" width="1200" height="600" src={`https://www.youtube.com/embed/${el.key}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe><br></br></>)
        })

        //Получаем страны фильмов и возвращаем из них span элементы
        let countries = props.detailsMovie.production_countries.map(country => {
            return (<span>{country.name}</span>)
        })

        //Получаем страны фильмов и возвращаем из них span элементы
        let bestGenres = props.detailsMovie.genres.map(genre => {
            return (<span key={genre.id}>{genre.name} </span>)
        })

        //Получаем похожие фильмы и преобразуем полученные данные в элементы FilmItem
        let similarMovieItems = props.similarMovie.results.map(film => {
            return (<FilmItem genresNames={props.genresNames} genres={film.genre_ids} key={film.id} id={film.id} vote={film.vote_average} adult={props.adult} release={film.release_date} title={film.title} img={film.backdrop_path != null ? `https://image.tmdb.org/t/p/w500/${film.backdrop_path}` : null} description={film.overview} type="movie" />)
        })

        //Получаем данные о компаниях занимавшимися данным фильмом и преобразуем в видимые элементы(текст + картинка)
        let productCompanies = props.detailsMovie.production_companies.map(product => {
            return (<div className={cmedia.products}><p>{product.name}</p>{product.logo_path != null && <img src={`https://image.tmdb.org/t/p/w500/${product.logo_path}`} alt="" />}</div>)
        })
        //Отрисовка
        return (
            <div className={cmedia.movieInfo}>
                <h4>{props.detailsMovie.title}</h4>
                <div className={cmedia.title}>
                    <img src={`https://image.tmdb.org/t/p/w500/${props.detailsMovie.backdrop_path}`} alt="" />
                    <div className={cmedia.titleText}>
                        <p><span>{props.detailsMovie.tagline}</span></p>
                        <p>Дата выхода: <span>{props.detailsMovie.release_date}</span> </p>
                        <p>Жанр: <span>{bestGenres}</span></p>
                        <p>Бюджет: <span>{props.detailsMovie.budget} $</span></p>
                        <div className={cmedia.companies}>Компании: {productCompanies}</div>
                        <p>Страны: {countries}</p>
                        <p>Продолжительность просмотра: <span>{props.detailsMovie.runtime} минут</span></p>
                        <p>Возрастные ограничения: {props.detailsMovie.adult ? <span>18+</span> : <span>нет</span>}</p>
                    </div>
                </div>

                <div className={cmedia.description}>
                    <p className={cmedia.vote}>Рейтинг TMDB: <span>{props.detailsMovie.vote_average != 0 ? props.detailsMovie.vote_average : 'ожидается'}</span> </p>
                    <p className={cmedia.about}>{props.detailsMovie.overview}</p>
                </div>

                {linksYouTube != '' &&
                    <>
                        <h3>Смотреть трейлер:</h3>
                        {linksYouTube}
                    </>
                }

                <h3>Смотрите также:</h3>
                <div className={cmedia.newsBlock}>
                    {similarMovieItems}
                </div>

            </div>
        )
    } else {
        return (<div className={cmedia.notfound}>
            <h1>В данный в базе данных нет данных о данном фильме...</h1>
        </div>)
    }
}

export default MovieInfo;