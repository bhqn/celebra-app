import "./Card.css"
import image from "../../../../assets/salgado.png"
import star from "../../../../assets/star.svg"

function Card (){
    return(
        <div className="card">
            
            <img src={image} className="card__image"/>
            <div className="card__info">
            <p className="card__title"> Cento de Salgados</p>
            <p className="card__store"> Salgados S.A</p>
            <div className="card__reviews">
            <p className="card__review_num"> 4.5</p>
            <img src={star}/>
            </div>
            <p className="card__price"> R$60,00</p>
            </div>
        </div>
    )
}
export default Card;