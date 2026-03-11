import CategoryCarousel from "../../components/CategoryCarousel/CategoryCarousel";
import Card from "../../components/card/Card";
import comida from "../../../../utils/models/comida";

function Food({ onOpen }) {
  return (
    <>
      {comida.map((categoria) =>
        categoria.subcategorias.map((sub) => (
          <CategoryCarousel
            key={sub.nome}
            title={sub.nome.charAt(0).toUpperCase() + sub.nome.slice(1)}
          >
            {sub.itens.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                nome={item.nome}
                foto={item.foto}
                preco={item.preco}
                avaliacao={item.avaliacao}
                loja={item.loja}
                descricao={item.descricao}
                sabores={item.sabores}
                onOpen={onOpen}
              />
            ))}
          </CategoryCarousel>
        )),
      )}
    </>
  );
}

export default Food;
