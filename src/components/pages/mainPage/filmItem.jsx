import { NavLink, useNavigate } from 'react-router-dom';
import cmedia from './main.module.css';

const FilmItem = (props) => {
    let history = useNavigate();
    const onItemClick = () => {
        history('movie/' + props.id);
    }

    return (

        <div className={cmedia.filmItem}>
            <h4>{props.title}</h4>
            {/* <NavLink to={`movie/${props.id}`}><img src={props.img} alt="" onClick={() => { }} /></NavLink> */}
            <img src={props.img} alt="" onClick={onItemClick} />
            <p>Оценка: {props.vote}</p>
            <p>Дата выхода: {props.release}</p>
            <p>Возрастные ограничения: {props.adult ? <span>18+</span> : <span>нет</span>}</p>
            {/* <p>{props.description}</p> */}
            <button>Больше...</button>
        </div>

    )
}
//https://image.tmdb.org/t/p/w500/ + props.img
export default FilmItem;