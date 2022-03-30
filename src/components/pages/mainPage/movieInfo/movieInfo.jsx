import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cmedia from './movieinfo.module.css';
import preloader from './../../../../media/preloaders/preloader.svg';
const MovieInfo = (props) => {

    //Получаем ID из URL
    const { id } = useParams();

    //После отрисовки компоненты получаем данные выбранного фильм полученные из API
    useEffect(() => {
        props.getVideosMovie(id);
        props.getGenres();
        props.getMovie(id);
    }, [])

    //Если данные еще не получены, отображаем загрузку страницы preloader
    if (props.isMovieInfoLoading) return (<div className={cmedia.preloader}>
        <img src={preloader} alt="" />
    </div>)

    else if (props.movieData != undefined) {
        //Иначе загружаем основные данные
        //Массив для имен жанров(хранятся в виде объектов{id:1,name:'any'})
        let genresNames = [];
        console.log(props.movieData)
        debugger;
        //Сверяем ID жанров текущего главного фильма с ID жанров API сервера и если ID совпадают, то загружаем их имена в массив genresNames
        for (let j = 0; j < props.movieData.genre_ids.length; j++) {
            for (let i = 0; i < props.genresNames.genres.length; i++) {
                if (props.movieData.genre_ids[j] === props.genresNames.genres[i].id) {
                    genresNames.push(props.genresNames.genres[i].name)
                }
            }
        }
        //Создаем блоки span из имен жанров
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
        //Отрисовка
        return (
            <div className={cmedia.movieInfo}>

                <div className={cmedia.title}>
                    <h4>{props.movieData.title}</h4>
                    <p>Дата выхода: <span>{props.movieData.release_date}</span> </p>
                    <p>Жанр: <span>{genres}</span></p>
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
            </div>
        )
    } else {
        return (<div className={cmedia.notfound}>
            <h1>В данный в базе данных нет данных о данном фильме...</h1>
        </div>)
    }
}

export default MovieInfo;