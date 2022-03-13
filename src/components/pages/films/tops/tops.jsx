import cmedia from './tops.module.css';
import top100 from '../../../../media/logo/top100.png';
import logo2022 from '../../../../media/logo/2022.png';
import travel from '../../../../media/logo/travel.jpg';
import zombie from '../../../../media/logo/zombie.jpg';
const Tops = (props) => {
    return (
        <div className={cmedia.tops}>
            <div className={cmedia.topBlock}>
                <a href="#"><img src={top100} alt="" /></a>
                <p>ТОП 100 фильмов</p>
            </div>
            <div className={cmedia.topBlock}>
                <a href="#"><img src={logo2022} alt="" /></a>
                <p>Лучшие фильмы 2022</p>
            </div>
            <div className={cmedia.topBlock}>
                <a href="#"><img src={travel} alt="" /></a>
                <p>Фильмы про путешествия</p>
            </div>
            <div className={cmedia.topBlock}>
                <a href="#"><img src={zombie} alt="" /></a>
                <p>Фильмы про зомби</p>
            </div>
        </div>)
}

export default Tops;