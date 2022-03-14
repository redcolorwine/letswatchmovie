import { NavLink, useNavigate } from 'react-router-dom';
import cmedia from './main.module.css';

const FilmItem = (props) => {
    let history = useNavigate();
    const onItemClick = () => {
        history('movie/' + props.id);
    }
    let genresNames = [];
    for (let j = 0; j < props.genres.length; j++) {
        for (let i = 0; i < props.genresNames.genres.length; i++) {
            if (props.genres[j] === props.genresNames.genres[i].id) {
                genresNames.push(props.genresNames.genres[i].name)
            }
        }
    }
    let genres = genresNames.map((genre) => {

        return (<span key={genre}>{genre} </span>)

    })

    // console.log(props.genresNames.genres[0].id);
    // console.log(props.genres);

    return (

        <div className={cmedia.filmItem}>
            <h4>{props.title}</h4>
            <img src={props.img} alt="" onClick={onItemClick} />
            <p>Оценка: {props.vote}</p>
            <p>Дата выхода: {props.release}</p>
            <p>Жанры: {genres}</p>
            <p>Возрастные ограничения: {props.adult ? <span>18+</span> : <span>нет</span>}</p>
            {/* <button>Больше...</button> */}
        </div>

    )
}
//https://image.tmdb.org/t/p/w500/ + props.img
export default FilmItem;