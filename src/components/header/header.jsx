import { NavLink } from 'react-router-dom';
import cmedia from './header.module.css';
import logo from '../../media/logo/logoBlack.PNG'
const Header = (props) => {
    return (
        <div className={cmedia.header}>
            <img src={logo} alt="" />
            <nav>
                <li><NavLink to="/">ГЛАВНАЯ</NavLink></li>
                <li><NavLink to="/films">ФИЛЬМЫ</NavLink></li>
                <li><NavLink to="/tvseries">СЕРИАЛЫ</NavLink></li>
                <li><NavLink to="/about">О НАС</NavLink></li>
            </nav>
        </div>
    )
}

export default Header;