import { NavLink, useNavigate } from 'react-router-dom';
import cmedia from './header.module.css';
import logo from '../../media/logo/logoBlack.PNG'
import React from 'react';


const Header = (props) => {
    let nameMovieRef = React.createRef()
    let history = useNavigate();
    //Устанавливаем слово поиска в переменную state, и вызываем функцию поиска по запросу
    const onSearchClick = () => {
        props.setSearchArea(nameMovieRef.current.value)
        props.searchMovies(nameMovieRef.current.value)
        let nameMovie = nameMovieRef.current.value;
        //Переходим на страницу найденных фильмов/сериалов
        history(`findmovie/${nameMovie}`);
        //Устанавливаем по умолчанию ключ, что поиск ведется фильма. При поиске сериала будет передан иной ключ "tv"
        props.setFoundKey('searchMovie');
    }

    return (
        <div className={cmedia.header}>
            <img src={logo} alt="" />
            <div className={cmedia.navbar}>
                <nav>
                    <li><NavLink to="/">ГЛАВНАЯ</NavLink></li>
                    <li><NavLink to="/films">ФИЛЬМЫ</NavLink></li>
                    <li><NavLink to="/pagetv">СЕРИАЛЫ</NavLink></li>
                    <li><NavLink to="/about">О НАС</NavLink></li>
                </nav>
                <input type="search" name="q" ref={nameMovieRef} />
                <button onClick={onSearchClick}>Поиск</button>
            </div>
        </div>
    )
}

export default Header;