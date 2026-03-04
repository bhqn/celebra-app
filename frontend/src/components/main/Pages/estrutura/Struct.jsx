
import CategoryCarousel from "../../components/CategoryCarousel/CategoryCarousel"
import Card from "../../components/card/Card"
import estrutura from "../../../../utils/models/estruturas"
function Struct( {onOpen}) {
  return (
    <>
      {estrutura.map((categoria) => (
        <CategoryCarousel
          key={categoria.categoria}
          title={categoria.categoria.charAt(0).toUpperCase() + categoria.categoria.slice(1)}
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
              onOpen={onOpen}
            />
          ))}
        </CategoryCarousel>
      ))}
    </>
  )
}

export default Struct