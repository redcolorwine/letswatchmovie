import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FilmItem from './filmItem';
import cmedia from './main.module.css';
import preloader from './../../../media/preloaders/preloader.svg';

const Main = (props) => {

    //Используем useNavigate() для навигации при клике на фильм и для добавления ID в URL
    let history = useNavigate();

    //Функция перехода
    const onItemClick = () => {
        history('movie/' + props.mostPopularFilms[props.currentMainFilm].id);
    }

    //Используем хук UseEffect чтобы сделать запросы API после отрисовки страницы
    //Чтобы избежать ошибок, пока данные не буду загружены - будем отображать "загрузку" используя svg preloader(картинку загрузки)
    useEffect(() => {
        //Запрашиваем данные в случае, если массивы данных пусты
        if (props.upcommingFilms == '' && props.mostPopularFilms == '') {
            //Загружаем популярные фильмы и ожидаемые(указав страницу 1)
            props.getFilmsForMainPage(1);
        }
    }, [])

    //Если данные не загружены, то отображаем svg preloader (загрузку)
    if (props.isMainPageLoading) {
        return (
            <div className={cmedia.preloader}>
                <img src={preloader} alt="" />
            </div>
        )
    } else {
        //Иначе получаем данные фильмов из state и передаем их для отрисовки компонент FilmItem(которая отображает популярные и ожидаемые фильмы)
        let popularFilmsFromServer = props.mostPopularFilms.map((film) => {
            return (<FilmItem genresNames={props.genres} genres={film.genre_ids} key={film.id} id={film.id} vote={film.vote_average} adult={props.adult} release={film.release_date} title={film.title} img={`https://image.tmdb.org/t/p/w500/${film.backdrop_path}`} description={film.overview} />)
        })
        let upcommingFilmsFromServer = props.upcommingFilms.map((film) => {
            return (<FilmItem genresNames={props.genres} genres={film.genre_ids} key={film.id} id={film.id} vote={film.vote_average} adult={props.adult} release={film.release_date} title={film.title} img={`https://image.tmdb.org/t/p/w500/${film.backdrop_path}`} description={film.overview} />)
        })

        //Массив для имен жанров(хранятся в виде объектов{id:1,name:'any'})
        let genresNames = [];
        //Сверяем ID жанров текущего главного фильма с ID жанров API сервера и если ID совпадают, то загружаем их имена в массив genresNames
        for (let j = 0; j < props.mostPopularFilms[props.currentMainFilm].genre_ids.length; j++) {
            for (let i = 0; i < props.genres.genres.length; i++) {
                if (props.mostPopularFilms[props.currentMainFilm].genre_ids[j] === props.genres.genres[i].id) {
                    genresNames.push(props.genres.genres[i].name)
                }
            }
        }
        //Создаем блоки span из имен жанров
        let genres = genresNames.map((genre) => {
            return (<span key={genre}>{genre} </span>)
        })

        return (
            <div className={cmedia.main}>
                {/* Главный блок */}
                <div className={cmedia.mainBlock}>
                    {/* Стрелка ВЛЕВО для смены главного фильма.
                        Если порядковый номер фильма больше единицы, 
                        то уменьшаем. Иначе вовзращаемся к последнему фильму.
                        Это нужно для того, чтобы не выйти за границы массива. С правой стрелкой аналогичный алгоритм.
                    */}
                    <button className={cmedia.arrowLeft} onClick={() => {
                        if (props.currentMainFilm >= 1) props.setCurrentMainFilm(props.currentMainFilm - 1);
                        else props.setCurrentMainFilm(props.mostPopularFilms.length - 1)
                    }}>&lt;</button>
                    {/* Отображаем главный фильм */}
                    <div className={cmedia.centerBlock}>
                        <img className={cmedia.animateBlock} src={`https://image.tmdb.org/t/p/w500/${props.mostPopularFilms[props.currentMainFilm].backdrop_path}`} onClick={onItemClick} alt="" />
                        <div className={cmedia.description}>
                            <h1>{props.mostPopularFilms[props.currentMainFilm].title}</h1>
                            <p>Дата выхода: {props.mostPopularFilms[props.currentMainFilm].release_date}</p>
                            <p>Жанр: {genres}</p>
                            <p>{props.mostPopularFilms[props.currentMainFilm].overview}</p>
                            <p>Оценка TMDB: {props.mostPopularFilms[props.currentMainFilm].vote_average}</p>
                            <button>Смотреть сейчас</button>
                        </div>
                    </div>
                    {/* Правая стрелка */}
                    <button className={cmedia.arrowRight} onClick={() => {
                        if (props.currentMainFilm < props.mostPopularFilms.length - 1) props.setCurrentMainFilm(props.currentMainFilm + 1)
                        else props.setCurrentMainFilm(0)
                    }}>	&gt;</button>


                </div>

                <div className={cmedia.actualLabel}>
                    <h1>Актуальные новинки: </h1>
                </div>
                {/* Блок популярных фильмов */}
                <div className={cmedia.newsBlock}>
                    {popularFilmsFromServer}
                </div>

                <div className={cmedia.actualLabel}>
                    <h1>Самое ожидаемое: </h1>
                </div>
                {/* Блок ожидаемых фильмов */}
                <div className={cmedia.newsBlock}>
                    {upcommingFilmsFromServer}
                </div>
                {/* Кнопка для прогрузки следующей порции ожидаемых фильмов*/}
                <button className={cmedia.down} onClick={() => { props.setCurrentUpcomingPage(props.currentUpcomingFilmPage + 1); props.addUpcomingFilms(props.currentUpcomingFilmPage); console.log(props.currentUpcomingFilmPage) }}>&darr;</button>
            </div>
        )
    }
}

export default Main;
