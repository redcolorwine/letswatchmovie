import { NavLink, useNavigate } from 'react-router-dom';
import cmedia from './header.module.css';
import logo from '../../media/logo/logoBlack.PNG'
import { usersAPI } from '../../api/api';
import { useState } from 'react';
const Header = (props) => {
    let history = useNavigate();

    const onSearchClick = () => {
        // history('findmovie/');
        // usersAPI.searchMovie(searchArea).then(response => {
        //     console.log(response.data)
        // })
        props.searchMovies(props.searchArea);
        console.log(props.foundMovies)

        // if (!props.isFoundMoviesLoading) {
        //     history('findmovie/');
        // }
    }
    const onStatusChange = (e) => {
        props.setSearchArea(e.currentTarget.value)
    }
    return (
        <div className={cmedia.header}>
            <img src={logo} alt="" />
            <div className={cmedia.navbar}>
                <nav>
                    <li><NavLink to="/">ГЛАВНАЯ</NavLink></li>
                    <li><NavLink to="/films">ФИЛЬМЫ</NavLink></li>
                    <li><NavLink to="/tvseries">СЕРИАЛЫ</NavLink></li>
                    <li><NavLink to="/about">О НАС</NavLink></li>
                </nav>

                <input type="search" name="q" value={props.searchArea} onChange={onStatusChange} />
                <button onClick={onSearchClick}>Поиск</button>

            </div>


        </div>
    )
}

export default Header;