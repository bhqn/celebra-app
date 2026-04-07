import { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import CategoryCarousel from "../../components/CategoryCarousel/CategoryCarousel";
import Card from "../../components/card/Card";
import { groupProducts } from "../../../../utils/groupProducts"

function Food({ onOpen }) {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFood() {
      try {
        const res = await api.get("/products");

        const estruturaFinal = groupProducts(
          res.data,
          "comida"
        );

        setFood(estruturaFinal);
      } catch (err) {
        console.error("Erro ao buscar comida:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFood();
  }, []);

  //  UX melhor
  if (loading) return <p>Carregando...</p>;
  if (!food.length) return <p>Nenhum item encontrado</p>;

  return (
    <>
      {food.map((categoria, idx) => (
        <CategoryCarousel
          key={`${categoria.categoria}-${categoria.subcategoria || idx}`}
          title={
            categoria.subcategoria
              ? categoria.subcategoria.charAt(0).toUpperCase() +
                categoria.subcategoria.slice(1)
              : categoria.categoria?.charAt(0).toUpperCase() +
                categoria.categoria?.slice(1)
          }
        >
          {categoria.itens.map((item) => (
            <Card
              key={item._id}
              id={item._id}
              nome={item.nome}
              foto={item.foto}
              preco={item.preco}
              avaliacao={item.avaliacao}
              loja={item.loja}
              descricao={item.descricao}
              sabores={item.sabores}
              categoria={categoria.categoria}
              subcategoria={categoria.subcategoria}
              onOpen={onOpen}
            />
          ))}
        </CategoryCarousel>
      ))}
    </>
  );
}

export default Food;