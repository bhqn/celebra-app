import "./Card.css"
import star from "../../../../assets/star.svg"

function Card ({ id, nome, foto, preco, avaliacao, loja, descricao,
    sabores,categoria, subcategoria, onOpen }){

    return(
        <div
          className="card"
          onClick={() => onOpen({ id, nome, foto, preco, avaliacao, loja, descricao,
    sabores, categoria, subcategoria })}
        >
            <img src={foto} className="card__image"/>

            <div className="card__info">
              <p className="card__title">{nome}</p>
              <p className="card__store">{loja}</p>

              <div className="card__reviews">
                <p className="card__review_num">{avaliacao}</p>
                <img src={star}/>
              </div>

              <p className="card__price">{preco}</p>
            </div>
        </div>
    )
}

export default Card