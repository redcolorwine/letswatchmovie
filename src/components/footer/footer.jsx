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
    )
}

export default Footer;