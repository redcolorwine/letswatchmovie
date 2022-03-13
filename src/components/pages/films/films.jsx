import { NavLink, Route, Routes } from 'react-router-dom';
import cmedia from './films.module.css';
import Genres from './genres/genres';
import Tops from './tops/tops';

import Years from './years/years';

const Films = (props) => {
    return (
        <div className={cmedia.films}>
            <div className={cmedia.headBlock}>
                <nav>
                    <li><NavLink to='films/tops'>Топы</NavLink></li>
                    <li><NavLink to='films/genres'>Жанры</NavLink></li>
                    <li><NavLink to='films/years'>Годы</NavLink></li>
                </nav>
            </div>
            <div className={cmedia.filmPages}>
                <Routes>
                    <Route path='/' element={<Tops />} />
                    <Route path='films/genres' element={<Genres />} />
                    <Route path='films/tops' element={<Tops />} />
                    <Route path='films/years' element={<Years />} />
                </Routes>
            </div>
        </div>
    )
}
export default Films;