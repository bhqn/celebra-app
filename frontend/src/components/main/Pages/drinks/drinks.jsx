import { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import CategoryCarousel from "../../components/CategoryCarousel/CategoryCarousel";
import Card from "../../components/card/Card";
import { groupProducts } from "../../../../utils/groupProducts"





function Drinks({ onOpen }) {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchdrinks() {
      try {
        const res = await api.get("/products");

      const estruturaFinal = groupProducts(
          res.data,
          "bebidas"
        );

        setDrinks(estruturaFinal);
      } catch (err) {
        console.error("Erro ao buscar comida:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchdrinks();
  }, []);


    // 🔥 UX melhor
  if (loading) return <p>Carregando...</p>;
  if (!drinks.length) return <p>Nenhum item encontrado</p>;
  return (
    <>
      {drinks.map((categoria, idx) => (
        <CategoryCarousel
          key={`${categoria.subcategoria}-${idx}`}
          title={
            categoria.subcategoria
              ? categoria.subcategoria.charAt(0).toUpperCase() + categoria.subcategoria.slice(1)
              : categoria.categoria.charAt(0).toUpperCase() + categoria.categoria.slice(1)
          }
        >
          {categoria.itens.map((item) => (
            <Card
              key={item._id} // importante
              id={item._id}
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
  );
}

export default Drinks;