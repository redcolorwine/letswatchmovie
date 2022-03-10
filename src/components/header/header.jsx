import { NavLink } from 'react-router-dom';
import cmedia from './header.module.css';
import logo from '../../media/logo/logoBlack.PNG'
const Header = (props) => {
    return (
        <div className={cmedia.header}>
            <img src={logo} alt="" />
            <nav>
                <li><NavLink to="/">MAIN</NavLink></li>
                <li><NavLink to="/films">FILMS</NavLink></li>
                <li><NavLink to="/tvseries">TV SERIES</NavLink></li>
                <li><NavLink to="/about">ABOUT US</NavLink></li>
            </nav>
        </div>
    )
}

export default Header;