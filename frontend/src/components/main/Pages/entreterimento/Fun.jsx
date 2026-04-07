import { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import CategoryCarousel from "../../components/CategoryCarousel/CategoryCarousel";
import Card from "../../components/card/Card";
import { groupProducts } from "../../../../utils/groupProducts";

function Fun({ onOpen }) {
  const [fun, setFun] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFun() {
      try {
        const res = await api.get("/products");

        const estruturaFinal = groupProducts(
          res.data,
          "entretenimento"
        );

        setFun(estruturaFinal);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchFun();
  }, []);

    //  UX melhor
  if (loading) return <p>Carregando...</p>;
  if (!fun.length) return <p>Nenhum item encontrado</p>;

  return (
    <>
      {fun.map((categoria, idx) => (
        <CategoryCarousel
          key={`${categoria.categoria}-${categoria.subcategoria || idx}`}
          title={
            categoria.subcategoria
              ? categoria.subcategoria.charAt(0).toUpperCase() +
                categoria.subcategoria.slice(1)
              : categoria.categoria.charAt(0).toUpperCase() +
                categoria.categoria.slice(1)
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

export default Fun;