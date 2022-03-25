import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cmedia from './tvInfo.module.css';
import preloader from './../../../../media/preloaders/preloader.svg';
const TVInfo = (props) => {

    //Получаем ID из URL
    const { id } = useParams();

    //После отрисовки компоненты получаем данные выбранного фильм полученные из API
    useEffect(() => {
        props.getTV(id);
    }, [])

    //Если данные еще не получены, отображаем загрузку страницы preloader
    if (props.isTVInfoLoading) return (<div className={cmedia.preloader}>
        <img src={preloader} alt="" />
    </div>)

    else if (props.tvData != undefined) {
        //Иначе загружаем основные данные
        //Массив для имен жанров(хранятся в виде объектов{id:1,name:'any'})
        let genresNames = [];
        console.log(props.tvData)
        //Сверяем ID жанров текущего главного фильма с ID жанров API сервера и если ID совпадают, то загружаем их имена в массив genresNames
        for (let j = 0; j < props.tvData.genre_ids.length; j++) {
            for (let i = 0; i < props.tvGenres.genres.length; i++) {
                if (props.tvData.genre_ids[j] === props.tvGenres.genres[i].id) {
                    genresNames.push(props.tvGenres.genres[i].name)
                }
            }
        }
        //Создаем блоки span из имен жанров
        let genres = genresNames.map((genre) => {
            return (<span key={genre}>{genre} </span>)
        })

        //Отрисовка
        return (
            <div className={cmedia.movieInfo}>

                <div className={cmedia.title}>
                    <h4>{props.tvData.title}</h4>
                    <p>Дата выхода: <span>{props.tvData.first_air_date}</span> </p>
                    <p>Жанр: <span>{genres}</span></p>
                    <p>Возрастные ограничения: {props.tvData.adult ? <span>18+</span> : <span>нет</span>}</p>
                    <img src={`https://image.tmdb.org/t/p/w500/${props.tvData.backdrop_path}`} alt="" />
                </div>

                <div className={cmedia.description}>
                    <p className={cmedia.vote}>Рейтинг TMDB: <span>{props.tvData.vote_average != 0 ? props.tvData.vote_average : 'ожидается'}</span> </p>
                    <p className={cmedia.about}>{props.tvData.overview}</p>
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