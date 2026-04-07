export function groupProducts(data, categoriaDesejada) {
  // 1. filtra categoria
  const filtrados = data.filter(
    p => p.categoria?.toLowerCase() === categoriaDesejada.toLowerCase()
  );

  // 2. agrupa por subcategoria
  const agrupado = {};

  filtrados.forEach((item) => {
    const key = item.subcategoria || "outros";

    if (!agrupado[key]) {
      agrupado[key] = [];
    }

    agrupado[key].push(item);
  });

  // 3. transforma no formato padrão
  return Object.keys(agrupado).map((key) => ({
    categoria: categoriaDesejada,
    subcategoria: key,
    itens: agrupado[key],
  }));
}