
import CategoryCarousel from "../../components/CategoryCarousel/CategoryCarousel"
import Card from "../../components/card/Card"
import bebidas from "../../../../utils/models/bebidas";
function Drinks({ onOpen }) {
  return (
    <>
      {bebidas.map((categoria, idx) => (
        <CategoryCarousel
          key={`${categoria.categoria}-${idx}`}
          title={
            categoria.subcategoria
              ? `${categoria.subcategoria.charAt(0).toUpperCase() + categoria.subcategoria.slice(1)}`
              : categoria.categoria.charAt(0).toUpperCase() + categoria.categoria.slice(1)
          }
        >
          {categoria.itens.map((item, index) => (
            <Card
              id={item.id}
              key={index}
              nome={item.nome}
              foto={item.foto}
              preco={item.preco}
              avaliacao={item.avaliacao}
              loja={item.loja}
              categoria={categoria.categoria}
              /* no subcategoria in this model */
              onOpen={onOpen}
            />
          ))}
        </CategoryCarousel>
      ))}
    </>
  )
}

export default Drinks;