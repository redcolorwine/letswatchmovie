import { useNavigate } from 'react-router-dom';
import cmedia from './main.module.css';
//Отображение фильма по отдельности на глявной странице
const FilmItem = (props) => {
    //При помощи useNavigate() добавляем в адресную строку ID выбранного фильма
    let history = useNavigate();
    const onItemClick = () => {
        history('movie/' + props.id);
    }

    //Массив для имен жанров(хранятся в виде объектов{id:1,name:'any'})
    let genresNames = [];

    //Сверяем ID жанров текущего главного фильма с ID жанров API сервера и если ID совпадают, то загружаем их имена в массив genresNames
    for (let j = 0; j < props.genres.length; j++) {
        for (let i = 0; i < props.genresNames.genres.length; i++) {
            if (props.genres[j] === props.genresNames.genres[i].id) {
                genresNames.push(props.genresNames.genres[i].name)
            }
        }
    }

    //Создаем блоки span из имен жанров
    let genres = genresNames.map((genre) => {
        return (<span key={genre}>{genre} </span>)
    })
    //Отрисовка
    return (
        <div className={cmedia.filmItem}>
            <h4>{props.title}</h4>
            <img src={props.img} alt="" onClick={onItemClick} />
            <p>Оценка: {props.vote != 0 ? props.vote : 'ожидается'}</p>
            <p>Дата выхода: {props.release}</p>
            <p>Жанры: {genres}</p>
            <p>Возрастные ограничения: {props.adult ? <span>18+</span> : <span>нет</span>}</p>
        </div>

    )
}

export default FilmItem;