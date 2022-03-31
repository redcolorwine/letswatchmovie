import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import cmedia from './movieinfo.module.css';
import preloader from './../../../../media/preloaders/preloader.svg';
import FilmItem from '../filmItem';
const MovieInfo = (props) => {
    let location = useLocation();
    //Получаем ID из URL
    const { id } = useParams();

    //После отрисовки компоненты получаем данные выбранного фильм полученные из API
    //НУЖНО ПРЕОБРАЗОВАТЬ В ОДИН ЗАПРОС!!!
    useEffect(() => {
        props.getVideosMovie(id);
        props.getSimilar(id);
        props.getGenres();
        props.getDetails(id);
        props.getMovie(id);
    }, [location.pathname])

    //Если данные еще не получены, отображаем загрузку страницы preloader
    if (props.isMovieInfoLoading) return (<div className={cmedia.preloader}>
        <img src={preloader} alt="" />
    </div>)

    else if (props.movieData != undefined) {
        //Иначе загружаем основные данные
        //Массив для имен жанров(хранятся в виде объектов{id:1,name:'any'})
        let genresNames = [];

        //Сверяем ID жанров текущего главного фильма с ID жанров API сервера и если ID совпадают, то загружаем их имена в массив genresNames
        for (let j = 0; j < props.movieData.genre_ids.length; j++) {
            for (let i = 0; i < props.genresNames.genres.length; i++) {
                if (props.movieData.genre_ids[j] === props.genresNames.genres[i].id) {
                    genresNames.push(props.genresNames.genres[i].name)
                }
            }
        }
        //Создаем блоки span из имен жанров
        //ЖАНРЫ НУЖНО ЛУЧШЕ ДОСТАТЬ ИЗ PROPS.DETAILS!!!
        //Из props.details МОЖНО ДОСТАТЬ ВСЕ ТО ЖЕ ЧТО и ИЗ прошлых "костылей"
        let genres = genresNames.map((genre) => {
            return (<span key={genre}>{genre} </span>)
        })
        let linksYouTube = props.ytLinks.map(el => {
            return (<><iframe width="800" height="400"
                src={`https://www.youtube.com/embed/${el.key}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe><br></br></>)
        })
        let countries = props.detailsMovie.production_countries.map(country => {
            return (<span>{country.name}</span>)
        })
        //ЛЕГЧАЙШИЕ ЖАНРЫ
        let bestGenres = props.detailsMovie.genres.map(genre => {
            return (<span key={genre.id}>{genre.name} </span>)
        })
        console.log(props.detailsMovie)
        let similarMovieItems = props.similarMovie.results.map(film => {
            return (<FilmItem genresNames={props.genresNames} genres={film.genre_ids} key={film.id} id={film.id} vote={film.vote_average} adult={props.adult} release={film.release_date} title={film.title} img={film.backdrop_path != null ? `https://image.tmdb.org/t/p/w500/${film.backdrop_path}` : null} description={film.overview} type="movie" />)
        })
        let productCompanies=props.detailsMovie.production_companies.map(product=>{
            return(<div className={cmedia.products}><p>{product.name}</p><img src={`https://image.tmdb.org/t/p/w500/${product.logo_path}`} alt="" /></div>)
        })
        //Отрисовка
        return (
            <div className={cmedia.movieInfo}>

                <div className={cmedia.title}>
                    <h4>{props.movieData.title}</h4>
                    <p><span>{props.detailsMovie.tagline}</span></p>
                    <p>Дата выхода: <span>{props.movieData.release_date}</span> </p>
                    <p>Жанр: <span>{genres}</span></p>
                    <p>Бюджет: <span>{props.detailsMovie.budget} $</span></p>
                    <div className={cmedia.companies}>Компании: {productCompanies}</div>
                    <p>Страны: {countries}</p>
                    <p>Лучшие легкие жанры: {bestGenres}</p>
                    <p>Продолжительность просмотра: <span>{props.detailsMovie.runtime} минут</span></p>
                    <p>Возрастные ограничения: {props.movieData.adult ? <span>18+</span> : <span>нет</span>}</p>
                    <img src={`https://image.tmdb.org/t/p/w500/${props.movieData.backdrop_path}`} alt="" />
                </div>

                <div className={cmedia.description}>
                    <p className={cmedia.vote}>Рейтинг TMDB: <span>{props.movieData.vote_average != 0 ? props.movieData.vote_average : 'ожидается'}</span> </p>
                    <p className={cmedia.about}>{props.movieData.overview}</p>
                </div>
                {linksYouTube != '' &&
                    <>
                        <h3>Смотреть трейлер:</h3>
                        {linksYouTube}
                    </>
                }
                <h3>Похожие фильмы</h3>
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