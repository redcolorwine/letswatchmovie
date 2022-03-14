import cmedia from './footer.module.css'
import facebook from '../../media/logo/facebook.png'
import instagram from '../../media/logo/instagram.png'
import whatsapp from '../../media/logo/whatsapp.png'
import youtube from '../../media/logo/youtube.png'
import telegram from '../../media/logo/telegram.png'
const Footer = (props) => {
    //Футер. Отображаем дату и знак копирайта
    var fullDate = new Date();
    var mm = fullDate.getMonth() + 1;
    var dd = fullDate.getDate();
    var year = fullDate.getFullYear();
    return (
        <div className={cmedia.footer}>
            <div className={cmedia.firstBlock}>
                <div className={cmedia.miniAbout}>
                    <h4>О нас</h4>
                    <li><a href="#">О приложении</a></li>
                    <li><a href="#">Политика конфиденциальности</a></li>
                    <li><a href="#">Размещение рекламы</a></li>
                    <li><a href="#">Пользовательское приглашение</a></li>
                </div>
                <div className={cmedia.miniNav}>
                    <h4>Навигация</h4>
                    <li><a href="#">Новости</a></li>
                    <li><a href="#">Фильмы</a></li>
                    <li><a href="#">Сериалы</a></li>
                    <li><a href="#">Новинки</a></li>
                </div>
                <div className={cmedia.miniHelp}>
                    <h4>Служба поддержки</h4>
                    <li><a href="#">Сообщить о проблеме</a></li>
                    <p>Поддержка работает круглосуточно</p>
                </div>
            </div>
            <div className={cmedia.lastBlock}>
                <div className={cmedia.logos}>
                    <img src={facebook} alt="" />
                    <img src={whatsapp} alt="" />
                    <img src={telegram} alt="" />
                    <img src={instagram} alt="" />
                    <img src={youtube} alt="" />
                </div>
                <div className={cmedia.footerLabel}>
                    <p>REDCOLORWINE &copy; {dd} / {mm} / {year}</p>
                </div>
            </div>


        </div>
    )
}

export default Footer;