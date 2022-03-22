import cmedia from './about.module.css';
import meBW from './../../../media/mebw.jpg'
import css from './../../../media/logo/css.png';
import html from './../../../media/logo/html.png';
import react from './../../../media/logo/react.png';
import js from './../../../media/logo/js.png';
import jq from './../../../media/logo/jq.png';
import redux from './../../../media/logo/redux.png';
const About = (props) => {
    return (
        <div className={cmedia.about}>
            <div className={cmedia.aboutText}>
                <div className={cmedia.text}>
                    <h1>Меня зовут Сергей!</h1>
                    <p>
                        Занимаюсь версткой и разработкой веб-приложений.
                        Я всегда стараюсь узнавать что-то новое и интересное.
                        Отучившись в университете по специальности «Компьютерные науки и инженерия»,
                        я нашел себя в веб-разработке и понял, что это мое. Многое дается мне не без труда,
                        но все это мне нравится, потому что с каждой интересной и сложной задачей приобретается
                        бесценный опыт.
                    </p>
                </div>
                <img src={meBW} alt="ME" />
            </div>
            <h4>Стэк технологий:</h4>
            <div className={cmedia.stackTech}>
                <img src={css} alt="" />
                <img src={html} alt="" />
                <img src={react} alt="" />
                <img src={redux} alt="" />
                <img src={js} alt="" />
                <img src={jq} alt="" />
            </div>
        </div>
    )
}
export default About;