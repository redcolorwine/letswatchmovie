import cmedia from './films.module.css';
import { useNavigate } from 'react-router-dom';
const Films = (props) => {
    let history = useNavigate();
    const onGenreClick = (event) => {
        props.searchMoviesWithGenre(event.target.id);
        history(`/findmovie/${event.target.getAttribute('value')}`);
        props.setFoundKey({ name: 'genre', id: event.target.id });
    }

    const onYearClick = (event) => {
        switch (event.target.id) {
            case "1990":
                props.searchMovieWithYears(1990, 1999);
                history(`/findmovie/${event.target.id}`);
                props.setFoundKey({ name: 'year90', from: 1990, to: 1999 });
                break;
            case "2000":
                props.searchMovieWithYears(2000, 2009);
                history(`/findmovie/${event.target.id}`);
                props.setFoundKey({ name: 'year10', from: 2000, to: 2009 });
                break;
            case "2010":
                props.searchMovieWithYears(2010, 2019);
                history(`/findmovie/${event.target.id}`);
                props.setFoundKey({ name: 'year20', from: 2010, to: 2019 });
                break;
            case "2020":
                props.searchMovieWithYears(2020, 2022);
                history(`/findmovie/${event.target.id}`);
                props.setFoundKey({ name: 'year22', from: 2020, to: 2022 });
                break;
            default: alert('Неизвестная ошибка!');
        }

    }
    const onTrandClick = (event) => {
        props.searchMovieWithTrand(event.target.id);
        history(`/findmovie/${event.target.getAttribute('value')}`);
        props.setFoundKey('trand');
    }
    return (
        <div className={cmedia.films}>
            <h1>Смотреть фильмы онлайн</h1>
            <p>Здесь Вы можете выбрать фильм себе по вкусу. Сортируйте по жанру, году, и по другим критериям и Вы обязательно найдете что-то по душе!</p>
            <div className={cmedia.filmPages}>
                <div className={cmedia.genres}>
                    <h3>Жанры:</h3>
                    <p>Поиск любимых фильмов по жанру</p>
                    <div className={cmedia.navBlock}>
                        <ul>
                            <li onClick={onGenreClick} id="28" value="боевик">боевик</li>
                            <li onClick={onGenreClick} id="12" value="приключения">приключения</li>
                            <li onClick={onGenreClick} id="16" value="мультфильм">мультфильм</li>
                            <li onClick={onGenreClick} id="35" value="комедия">комедия</li>
                        </ul>
                        <ul>
                            <li onClick={onGenreClick} id="80" value="криминал">криминал</li>
                            <li onClick={onGenreClick} id="99" value="документальный">документальный</li>
                            <li onClick={onGenreClick} id="18" value="драма">драма</li>
                            <li onClick={onGenreClick} id="10751" value="семейный">семейный</li>
                        </ul>
                        <ul>
                            <li onClick={onGenreClick} id="14" value="фэнтези">фэнтези</li>
                            <li onClick={onGenreClick} id="36" value="история">история</li>
                            <li onClick={onGenreClick} id="27" value="ужасы">ужасы</li>
                            <li onClick={onGenreClick} id="10402" value="музыка">музыка</li>
                        </ul>
                        <ul>
                            <li onClick={onGenreClick} id="9648" value="детектив">детектив</li>
                            <li onClick={onGenreClick} id="10749" value="мелодрама">мелодрама</li>
                            <li onClick={onGenreClick} id="878" value="фантастика">фантастика</li>
                            <li onClick={onGenreClick} id="10770" value="телевизионный">телевизионный фильм</li>
                        </ul>
                        <ul>
                            <li onClick={onGenreClick} id="53" value="триллер">триллер</li>
                            <li onClick={onGenreClick} id="10752" value="военный">военный</li>
                            <li onClick={onGenreClick} id="37" value="вестерн">вестерн</li>
                        </ul>
                    </div>
                </div>
                <div className={cmedia.years}>
                    <h3>Годы:</h3>
                    <p>Можешь выбрать временной диапазон, чтобы ознакомиться с фильмами десятилетия</p>
                    <nav>
                        <li onClick={onYearClick} id="1990">90ые</li>
                        <li onClick={onYearClick} id="2000">2000ые</li>
                        <li onClick={onYearClick} id="2010">2010+</li>
                        <li onClick={onYearClick} id="2020">2020+</li>
                    </nav>
                </div>
                <div className={cmedia.trands}>
                    <h3>Тренды:</h3>
                    <p>Унай, какие фильмы находятся в трендах дня и недели!</p>
                    <nav>
                        <li onClick={onTrandClick} id="day" value="Тренды дня" className={cmedia.day}>День</li>
                        <li onClick={onTrandClick} id="week" value="Тренды недели" className={cmedia.week}>Неделя</li>
                    </nav>
                </div>
            </div>
        </div>
    )
}
export default Films;