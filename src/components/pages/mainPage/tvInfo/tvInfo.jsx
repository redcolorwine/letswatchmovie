import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import cmedia from './tvInfo.module.css';
import preloader from './../../../../media/preloaders/preloader.svg';
import FilmItem from '../filmItem';
const TVInfo = (props) => {
    let location = useLocation();
    //Получаем ID из URL
    const { id } = useParams();

    //После отрисовки компоненты получаем данные выбранного фильм полученные из API
    //В зависимость добавляем url, чтобы при его изменении страница перерендерилась
    useEffect(() => {
        props.getAllDetails(id);
    }, [location.pathname])

    //Если данные еще не получены, отображаем загрузку страницы preloader
    if (props.isTVInfoLoading) return (<div className={cmedia.preloader}>
        <img src={preloader} alt="" />
    </div>)

    else if (props.detailsTv != undefined) {

        //Иначе загружаем основные данные
        //Массив для имен жанров(хранятся в виде объектов{id:1,name:'any'})
        let genresNames = [];

        for (let i = 0; i < props.detailsTv.genres.length; i++) {
            genresNames.push(props.detailsTv.genres[i].name)
        }
        let genres = props.detailsTv.genres.map(genre => {
            return (<span key={genre.id}>{genre.name} </span>)
        })

        let linksYouTube = props.ytLinks.map(el => {
            return (<><iframe title="YtLinks" width="1200" height="600"
                src={`https://www.youtube.com/embed/${el.key}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe><br></br></>)
        })
        let similarTvItems = props.similarTv.results.map(film => {
            return (<FilmItem genresNames={props.tvGenres} genres={film.genre_ids} key={film.id} id={film.id} vote={film.vote_average} adult={props.adult} release={film.first_air_date} title={film.name} img={film.backdrop_path != null ? `https://image.tmdb.org/t/p/w500/${film.backdrop_path}` : null} description={film.overview} type="tv" />)
        })
        let countries = props.detailsTv.production_countries.map(country => {
            return (<span>{country.name}</span>)
        })
        let productCompanies = props.detailsTv.production_companies.map(product => {
            return (<div className={cmedia.products}><p>{product.name}</p>{product.logo_path != null && <img src={`https://image.tmdb.org/t/p/w500/${product.logo_path}`} alt="" />}</div>)
        })
        //Отрисовка
        return (
            <div className={cmedia.movieInfo}>
                <h4>{props.detailsTv.name}</h4>
                <div className={cmedia.title}>
                    <img src={`https://image.tmdb.org/t/p/w500/${props.detailsTv.backdrop_path}`} alt="" />
                    <div className={cmedia.titleText}>

                        <p><span>{props.detailsTv.tagline}</span></p>
                        <p>Дата выхода: <span>{props.detailsTv.first_air_date}</span> </p>
                        <p>Дата выхода последней серии: <span>{props.detailsTv.last_air_date}</span> </p>
                        <p>Количество сезонов: <span>{props.detailsTv.number_of_seasons}</span></p>
                        <p>Количество серий: <span>{props.detailsTv.number_of_episodes}</span></p>
                        <p>Жанр: <span>{genres}</span></p>
                        <p>Возрастные ограничения: {props.detailsTv.adult ? <span>18+</span> : <span>нет</span>}</p>
                        <div className={cmedia.companies}>Компании: {productCompanies} </div>
                        <p>Страны: {countries}</p>
                        <p>Продолжительность просмотра: <span>{props.detailsTv.runtime} минут</span></p>
                    </div>


                </div>

                <div className={cmedia.description}>
                    <p className={cmedia.vote}>Рейтинг TMDB: <span>{props.detailsTv.vote_average != 0 ? props.detailsTv.vote_average : 'ожидается'}</span> </p>
                    <p className={cmedia.about}>{props.detailsTv.overview}</p>
                </div>
                {linksYouTube != '' &&
                    <>
                        <h3>Смотреть трейлер:</h3>
                        {linksYouTube}
                    </>
                }
                <h3>Похожие сериалы</h3>
                <div className={cmedia.newsBlock}>
                    {similarTvItems}
                </div>
            </div>
        )
    } else {
        return (<div className={cmedia.notfound}>
            <h1>В данный в базе данных нет данных о данном фильме...</h1>
        </div>)
    }
}

export default TVInfo;