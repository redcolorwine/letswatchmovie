import cmedia from './reviewItem.module.css';
import userlogo from '../../../media/logo/mnogoznaal.jpg'
const ReviewItem = (props) => {
    return (
        <div className={cmedia.reviewItem}>
            <div className={cmedia.reviewAva}>
                <img src={props.avaPath != null ? props.avaPath : userlogo} alt="" />
                <h4>{props.userName}</h4>
            </div>

            <div className={cmedia.reviewText}>
                <hr />
                <p>{props.content}</p>
                <p><span>Создано </span>{props.created_at} <span>Обновлено </span>{props.updated_at}</p>
            </div>
        </div>
    )
}

export default ReviewItem;