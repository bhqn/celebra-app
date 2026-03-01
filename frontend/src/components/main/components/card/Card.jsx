import "./Card.css"

import star from "../../../../assets/star.svg"
import comida from "../../../../utils/models/comida"

function Card ({nome, foto, preco, avaliacao, loja}){
    return(
        <div className="card">
            
            <img src={foto} className="card__image"/>
            <div className="card__info">
            <p className="card__title"> {nome}</p>
            <p className="card__store"> {loja}</p>
            <div className="card__reviews">
            <p className="card__review_num"> {avaliacao}</p>
            <img src={star}/>
            </div>
            <p className="card__price"> {preco}</p>
            </div>
        </div>
    )
}
export default Card;