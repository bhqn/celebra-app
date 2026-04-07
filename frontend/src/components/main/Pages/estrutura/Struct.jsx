import { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import CategoryCarousel from "../../components/CategoryCarousel/CategoryCarousel";
import Card from "../../components/card/Card";
import { groupProducts } from "../../../../utils/groupProducts"

function Struct({ onOpen }) {
  const [struct, setstruct] = useState([]);
    const [loading, setLoading] = useState(true);

   useEffect(() => {

      async function fetchstruct() {
        try {
          const res = await api.get("/products");
  
          const structFinal = groupProducts(
            res.data,
            "estrutura"
          );
  
        setstruct(structFinal);
        } catch (err) {
          console.error("Erro ao buscar comida:", err);
        } finally {
          setLoading(false);
        }
      }
  
      fetchstruct();
    }, []);

  //  UX melhor
  if (loading) return <p>Carregando...</p>;
  if (!struct.length) return <p>Nenhum item encontrado</p>;

  return (
    <>
      {struct.map((categoria, idx) => (
        <CategoryCarousel
          key={`${categoria.categoria}-${idx}`}
          title={
            categoria.categoria.charAt(0).toUpperCase() +
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
              categoria="estrutura"
              subcategoria={categoria.categoria}
              onOpen={onOpen}
            />
          ))}
        </CategoryCarousel>
      ))}
    </>
  );
}

export default Struct;