
import CategoryCarousel from "../../components/CategoryCarousel/CategoryCarousel"
import Card from "../../components/card/Card"
import fun from "../../../../utils/models/entreterimento"
function Fun({ onOpen }) {
  return (
    <>
      {fun.map((categoria, idx) => (
        <CategoryCarousel
          key={`${categoria.categoria}-${categoria.subcategoria || idx}`}
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
              subcategoria={categoria.subcategoria}
              onOpen={onOpen}
            />
          ))}
        </CategoryCarousel>
      ))}
    </>
  )
}

export default Fun