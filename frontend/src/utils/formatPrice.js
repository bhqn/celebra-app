/**
 * Converte preço de centavos para reais formatado
 * @param {number} priceInCents - Preço em centavos (ex: 35000)
 * @returns {string} - Preço formatado (ex: "R$ 350,00")
 */
export const formatPrice = (priceInCents) => {
  if (priceInCents === undefined || priceInCents === null) {
    return 'R$ 0,00';
  }
  
  const reais = priceInCents / 100;
  return reais.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

// Versão alternativa se quiser apenas o número sem símbolo
export const formatPriceNumber = (priceInCents) => {
  if (priceInCents === undefined || priceInCents === null) {
    return '0,00';
  }
  
  return (priceInCents / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};