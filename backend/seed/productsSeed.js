import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/products.js"; // ajuste se necessário

dotenv.config();
 
//await mongoose.connect(process.env.MONGO_URI);
 
const produtos = [
  // ─────────────────────────────────────────────
  // COMIDA – Salgados
  // ─────────────────────────────────────────────
  {
    id: 1,
    nome: "Coxinha",
    descricao: "Salgado frito em formato de gota recheado com frango desfiado.",
    categoria: "Comida",
    subcategoria: "Salgados",
    preco: 4500,
    avaliacao: 4.7,
    loja: "Salgados da Maria",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQdGwVamn-0SDTsc6539xIfhy57vKDF2rHZQ&s",
    sabores: ["frango", "frango com catupiry"],
    tipo: "produto"
  },
  {
    id: 2,
    nome: "Esfiha",
    descricao: "Esfiha tradicional da culinária árabe assada.",
    categoria: "Comida",
    subcategoria: "Salgados",
    preco: 5000,
    avaliacao: 4.5,
    loja: "Cantinho Árabe",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrPuPuRH8gZZ7CN7L4HPCnjcPgmfr_hoRnjg&s",
    sabores: ["carne", "queijo", "frango"],
    tipo: "produto"
  },
  {
    id: 3,
    nome: "Pastel",
    descricao: "Pastel crocante frito na hora.",
    categoria: "Comida",
    subcategoria: "Salgados",
    preco: 2500,
    avaliacao: 4.6,
    loja: "Pastel & Cia",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyX11qsoEOA5n9P9wgENbPZBfSZH9627nBZQ&s",
    sabores: ["carne", "queijo", "pizza"],
    tipo: "produto"
  },
  {
    id: 4,
    nome: "Kibe",
    descricao: "Kibe crocante feito com trigo e carne temperada.",
    categoria: "Comida",
    subcategoria: "Salgados",
    preco: 4000,
    avaliacao: 4.3,
    loja: "Salgados da Maria",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdfSsbk2LI6mxiz5TjGY9k4cDDkNBkg09z9A&s",
    sabores: ["carne", "queijo"],
    tipo: "produto"
  },
  {
    id: 5,
    nome: "Empada",
    descricao: "Empada assada com massa amanteigada.",
    categoria: "Comida",
    subcategoria: "Salgados",
    preco: 3500,
    avaliacao: 4.4,
    loja: "Empadas da Ana",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ-uJFsUwdj2cXMlQa19abuVIz3vjoitIioQ&s",
    sabores: ["frango", "palmito"],
    tipo: "produto"
  },
  {
    id: 6,
    nome: "Bolinho de Bacalhau",
    descricao: "Bolinho tradicional português feito com bacalhau.",
    categoria: "Comida",
    subcategoria: "Salgados",
    preco: 5500,
    avaliacao: 4.8,
    loja: "Salgados do Porto",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtW5CgoQ6qENnDYVJ6Rmk8yfoo5o_cxbMHiQ&s",
    sabores: ["bacalhau"],
    tipo: "produto"
  },
 
  // ─────────────────────────────────────────────
  // COMIDA – Doces
  // ─────────────────────────────────────────────
  {
    id: 7,
    nome: "Brigadeiro",
    descricao: "Doce brasileiro feito com chocolate e leite condensado.",
    categoria: "Comida",
    subcategoria: "Doces",
    preco: 3000,
    avaliacao: 4.9,
    loja: "Doces da Ana",
    foto: "https://www.sabornamesa.com.br/media/k2/items/cache/5003d452a8da016f3ed02a6385cf54e8_XL.jpg",
    sabores: ["chocolate", "chocolate branco"],
    tipo: "produto"
  },
  {
    id: 8,
    nome: "Cupcake",
    descricao: "Bolinho doce com cobertura cremosa.",
    categoria: "Comida",
    subcategoria: "Doces",
    preco: 3500,
    avaliacao: 4.6,
    loja: "Sweet Party",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLx5Jdq8ZfMugqYboSyKWLy79uuUBIrY9Z6A&s",
    sabores: ["chocolate", "baunilha", "morango"],
    tipo: "produto"
  },
  {
    id: 9,
    nome: "Beijinho",
    descricao: "Doce de coco com leite condensado.",
    categoria: "Comida",
    subcategoria: "Doces",
    preco: 2800,
    avaliacao: 4.7,
    loja: "Doces da Ana",
    foto: "https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop_new/public/srh_recipes/8d6a0e43fea8d543981a3eb7d870f3b0.jpeg?itok=azWUsQbD",
    sabores: ["coco"],
    tipo: "produto"
  },
  {
    id: 10,
    nome: "Cookies",
    descricao: "Biscoito doce crocante com gotas de chocolate.",
    categoria: "Comida",
    subcategoria: "Doces",
    preco: 4500,
    avaliacao: 4.8,
    loja: "Confeitaria Doce Lar",
    foto: "https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_mobile/public/srh_recipes/9034b04c2a91dfb5bea0d43956e196af.jpeg?itok=Gd9hyJDw",
    sabores: ["chocolate", "chocolate branco"],
    tipo: "produto"
  },
  {
    id: 11,
    nome: "Churros",
    descricao: "Massa frita crocante recheada.",
    categoria: "Comida",
    subcategoria: "Doces",
    preco: 2500,
    avaliacao: 4.6,
    loja: "Churros & Cia",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ05bWS2JahzbufphcxZvPeTD0PJFlJ6yrjPA&s",
    sabores: ["doce de leite", "chocolate"],
    tipo: "produto"
  },
  {
    id: 12,
    nome: "Brownie",
    descricao: "Bolo de chocolate denso e úmido.",
    categoria: "Comida",
    subcategoria: "Doces",
    preco: 3200,
    avaliacao: 4.5,
    loja: "Brownies da Casa",
    foto: "https://static.itdg.com.br/images/640-400/0191a4f23349e54e618a65f2051d68a8/shutterstock-1915577575-2-.jpg",
    sabores: ["chocolate", "chocolate com nozes"],
    tipo: "produto"
  },
 
  // ─────────────────────────────────────────────
  // COMIDA – Bolos
  // ─────────────────────────────────────────────
  {
    id: 13,
    nome: "Torta de Chocolate",
    descricao: "Torta cremosa com recheio de chocolate.",
    categoria: "Comida",
    subcategoria: "Bolos",
    preco: 10000,
    avaliacao: 4.2,
    loja: "Distribuidora Festa",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJkFyz030728kDnKvLRU_sseViSqsQrSYI_Q&s",
    sabores: ["chocolate", "meio amargo"],
    tipo: "produto"
  },
  {
    id: 14,
    nome: "Torta de Limão",
    descricao: "Torta gelada com creme de limão e merengue.",
    categoria: "Comida",
    subcategoria: "Bolos",
    preco: 12000,
    avaliacao: 4.8,
    loja: "Vida Saudável",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmDirNIfjsprWHp9BesE0-ydNyvqElgUZQTQ&s",
    sabores: ["limão"],
    tipo: "produto"
  },
  {
    id: 15,
    nome: "Bolo de Casamento",
    descricao: "Bolo decorado especial para festas e casamentos.",
    categoria: "Comida",
    subcategoria: "Bolos",
    preco: 80000,
    avaliacao: 4.9,
    loja: "Distribuidora Festa",
    foto: "https://cdnm.westwing.com.br/glossary/uploads/br/2023/04/06141635/bolo-de-casamento-simples.png",
    sabores: ["baunilha", "chocolate", "red velvet"],
    tipo: "produto"
  },
  {
    id: 16,
    nome: "Torta de Churros",
    descricao: "Torta inspirada no sabor de churros com recheio de doce de leite e canela.",
    categoria: "Comida",
    subcategoria: "Bolos",
    preco: 12000,
    avaliacao: 4.4,
    loja: "Bebidas do Bar",
    foto: "https://www.receitasnestle.com.br/sites/default/files/styles/cropped_recipe_card_new/public/srh_recipes/c711813431ff9346d5375595faf50d75.jpg?itok=rSqIA9Hn",
    sabores: ["doce de leite", "canela"],
    tipo: "produto"
  },
  {
    id: 17,
    nome: "Bolo de Morango",
    descricao: "Bolo fofo recheado com morango e chantilly.",
    categoria: "Comida",
    subcategoria: "Bolos",
    preco: 7000,
    avaliacao: 4.7,
    loja: "Adega do João",
    foto: "https://receitatodahora.com.br/wp-content/uploads/2022/03/bolo-de-morango-com-chantilly-scaled.jpg",
    sabores: ["morango", "morango com chantilly"],
    tipo: "produto"
  },
  {
    id: 18,
    nome: "Bolo de Abacaxi",
    descricao: "Bolo doce com recheio de abacaxi.",
    categoria: "Comida",
    subcategoria: "Bolos",
    preco: 1500,
    avaliacao: 4.6,
    loja: "Vida Saudável",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgwh-lDlFKbAYi413EG7NNirtzy2QUkm77jA&s",
    sabores: ["abacaxi", "abacaxi com coco"],
    tipo: "produto"
  },
 
  // ─────────────────────────────────────────────
  // BEBIDAS – Não alcoólicas
  // ─────────────────────────────────────────────
  {
    id: 19,
    nome: "Coca-Cola 2L",
    descricao: "Refrigerante Coca-Cola sabor original em garrafa de 2 litros.",
    categoria: "Bebidas",
    subcategoria: "Não alcoólicas",
    preco: 800,
    avaliacao: 4.7,
    loja: "Bebidas Festa",
    foto: "https://cdn.awsli.com.br/600x1000/1957/1957771/produto/1047697460688b682cc.jpg",
    sabores: [],
    tipo: "produto"
  },
  {
    id: 20,
    nome: "Fanta Uva 2L",
    descricao: "Refrigerante Fanta sabor uva em garrafa de 2 litros.",
    categoria: "Bebidas",
    subcategoria: "Não alcoólicas",
    preco: 750,
    avaliacao: 4.5,
    loja: "Bebidas Festa",
    foto: "https://bretas.vtexassets.com/arquivos/ids/203616/65730d44dddb07d995cdb7fb.jpg?v=638376356557430000",
    sabores: [],
    tipo: "produto"
  },
  {
    id: 21,
    nome: "Fanta Laranja 2L",
    descricao: "Refrigerante Fanta sabor laranja em garrafa de 2 litros.",
    categoria: "Bebidas",
    subcategoria: "Não alcoólicas",
    preco: 750,
    avaliacao: 4.6,
    loja: "Bebidas Festa",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1cUMOJ3JgubNyre0cPYZNqseQ4Ussnn8iJQ&s",
    sabores: [],
    tipo: "produto"
  },
  {
    id: 22,
    nome: "Sprite 2L",
    descricao: "Refrigerante Sprite sabor limão em garrafa de 2 litros.",
    categoria: "Bebidas",
    subcategoria: "Não alcoólicas",
    preco: 700,
    avaliacao: 4.4,
    loja: "Bebidas Festa",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9RyX_UlM2wvDC3YvuohMH2vtFiMFj574v5A&s",
    sabores: [],
    tipo: "produto"
  },
  {
    id: 23,
    nome: "Minalba c/gás 1L",
    descricao: "Água mineral Minalba com gás em garrafa de 1 litro.",
    categoria: "Bebidas",
    subcategoria: "Não alcoólicas",
    preco: 700,
    avaliacao: 4.4,
    loja: "Bebidas Festa",
    foto: "https://prezunic.vtexassets.com/arquivos/ids/180723/65678a821ef37396807615ad.jpg?v=638368812869270000",
    sabores: [],
    tipo: "produto"
  },
 
  // ─────────────────────────────────────────────
  // BEBIDAS – Alcoólicas
  // ─────────────────────────────────────────────
  {
    id: 24,
    nome: "Chopp Brahma",
    descricao: "Chopp Brahma claro de 30 litros, ideal para festas e eventos.",
    categoria: "Bebidas",
    subcategoria: "Alcoólicas",
    preco: 12000,
    avaliacao: 4.6,
    loja: "Bar Festa",
    foto: "https://choppbrahmaexpress.vtexassets.com/arquivos/ids/157188/Chopp-Brahma-Claro-30L.png?v=637818559298630000",
    sabores: [],
    tipo: "produto"
  },
  {
    id: 25,
    nome: "Heineken Litrão",
    descricao: "Cerveja Heineken em garrafa de 1 litro.",
    categoria: "Bebidas",
    subcategoria: "Alcoólicas",
    preco: 2000,
    avaliacao: 4.7,
    loja: "Bar Festa",
    foto: "https://mambodelivery.vtexassets.com/arquivos/ids/229319-800-450?v=638786711085230000&width=800&height=450&aspect=true",
    sabores: [],
    tipo: "produto"
  },
  {
    id: 26,
    nome: "Itaipava Lata 473ml",
    descricao: "Cerveja Itaipava em lata de 473ml.",
    categoria: "Bebidas",
    subcategoria: "Alcoólicas",
    preco: 1000,
    avaliacao: 4.4,
    loja: "Bar Festa",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7leqhBoTF237IpwF1_wrZJUK2P7rDl_-5g&s",
    sabores: [],
    tipo: "produto"
  },
  {
    id: 27,
    nome: "Spaten Lata 300ml",
    descricao: "Cerveja Spaten em lata de 300ml.",
    categoria: "Bebidas",
    subcategoria: "Alcoólicas",
    preco: 1100,
    avaliacao: 4.5,
    loja: "Bar Festa",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Z6Dp2ftZYVBMSLbPH9Z78IsK9yDuKLQ21A&s",
    sabores: [],
    tipo: "produto"
  },
 
  // ─────────────────────────────────────────────
  // ESTRUTURA – Festa
  // ─────────────────────────────────────────────
  {
    id: 28,
    nome: "Pano de mesa FESTA",
    descricao: "Toalha de mesa decorativa para festas e eventos.",
    categoria: "Estrutura",
    subcategoria: "Festa",
    preco: 4000,
    avaliacao: 4.8,
    loja: "Decorações & Festas",
    foto: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSPGMPwhyGFS0bOoc_y8IZscl5aWY1fEH1i_GFaT96kK0nXzVKQj6NcCak2l_bmP7WyuCucqGMxrXKDv4A2UbCBfuoHRZW5DMVhdVq7ZSrs_RO5hXWX4m6mdsJo2qNEu4gPCoWcKKch_w&usqp=CAc",
    sabores: [],
    tipo: "produto"
  },
  {
    id: 29,
    nome: "Iluminação LED",
    descricao: "Kit de iluminação LED colorida para ambientação de festas e eventos.",
    categoria: "Estrutura",
    subcategoria: "Festa",
    preco: 5000,
    avaliacao: 4.7,
    loja: "Luz & Festa",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR64crMu9o3jVDhMrjRh08WU0M9nPt7SnIH4g&s",
    sabores: [],
    tipo: "produto"
  },
  {
    id: 30,
    nome: "Balões temáticos",
    descricao: "Kit de balões decorativos temáticos com confete para festas de aniversário.",
    categoria: "Estrutura",
    subcategoria: "Festa",
    preco: 12000,
    avaliacao: 4.9,
    loja: "Decorações & Festas",
    foto: "https://images.tcdn.com.br/img/img_prod/1130884/kit_de_baloes_rose_gold_com_confete_decoracao_para_festa_de_aniversario_1369_1_a959fb18b9c483cec23d3356829e7325.jpg",
    sabores: [],
    tipo: "produto"
  },
  {
    id: 31,
    nome: "Painel de fundo para fotos",
    descricao: "Painel redondo decorativo para servir de fundo em fotos de festas e eventos.",
    categoria: "Estrutura",
    subcategoria: "Festa",
    preco: 45000,
    avaliacao: 4.8,
    loja: "Eventos Criativos",
    foto: "https://d5gag3xtge2og.cloudfront.net/producao/34761857/G/painel_redondo_04.png",
    sabores: [],
    tipo: "produto"
  },
  {
    id: 32,
    nome: "Kit de louças decorativas",
    descricao: "Conjunto de louças coloridas para aluguel em festas infantis e eventos.",
    categoria: "Estrutura",
    subcategoria: "Festa",
    preco: 30000,
    avaliacao: 4.6,
    loja: "Mesa Posta Festas",
    foto: "https://img.elo7.com.br/product/zoom/3E829AC/aluguel-loucas-coloridas-festa-infantil.jpg",
    sabores: [],
    tipo: "produto"
  },
 
  // ─────────────────────────────────────────────
  // ESTRUTURA – Aluguel
  // ─────────────────────────────────────────────
  {
    id: 33,
    nome: "Tenda para eventos",
    descricao: "Tenda para cobertura de áreas externas em eventos e festas.",
    categoria: "Estrutura",
    subcategoria: "Aluguel",
    preco: 100000,
    avaliacao: 4.7,
    loja: "Aluguel de Festas SP",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUaU7DO1sGJUaLz-ej-1PfqyLZFf3Aq_YD1w&s",
    sabores: [],
    tipo: "serviço"
  },
  {
    id: 34,
    nome: "Palco para shows",
    descricao: "Palco estruturado para shows e apresentações ao vivo em eventos.",
    categoria: "Estrutura",
    subcategoria: "Aluguel",
    preco: 150000,
    avaliacao: 4.9,
    loja: "Palco & Eventos",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk37rX7xyadlfsBcir_zUJghn7frLEdQqa6w&s",
    sabores: [],
    tipo: "serviço"
  },
  {
    id: 35,
    nome: "Som profissional",
    descricao: "Sistema de som profissional com caixas e equipamentos para festas e eventos.",
    categoria: "Estrutura",
    subcategoria: "Aluguel",
    preco: 80000,
    avaliacao: 4.8,
    loja: "Som e Luz Eventos",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjxc3KMG6AeB8_9D49LyhHoV0MyywiXFhxxw&s",
    sabores: [],
    tipo: "serviço"
  },
  {
    id: 36,
    nome: "Cadeiras de plástico",
    descricao: "Cadeiras de plástico empilháveis para aluguel em festas e eventos.",
    categoria: "Estrutura",
    subcategoria: "Aluguel",
    preco: 15000,
    avaliacao: 4.5,
    loja: "Aluguel de Festas SP",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9pk5qnVw__yKlDzptU_iNoR7A3UKPJkEGKg&s",
    sabores: [],
    tipo: "serviço"
  },
  {
    id: 37,
    nome: "Mesas retangulares",
    descricao: "Mesas retangulares para aluguel em festas, eventos e buffets.",
    categoria: "Estrutura",
    subcategoria: "Aluguel",
    preco: 25000,
    avaliacao: 4.6,
    loja: "Móveis para Eventos",
    foto: "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mh7v8ro4lon8d3_tn",
    sabores: [],
    tipo: "serviço"
  },
  {
    id: 38,
    nome: "Utensílios de cozinha para buffet",
    descricao: "Kit completo de utensílios de cozinha para uso em buffets e eventos gastronômicos.",
    categoria: "Estrutura",
    subcategoria: "Aluguel",
    preco: 40000,
    avaliacao: 4.7,
    loja: "Buffet & Aluguel",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_sfUyy3v44zOdq6whYUNWl7mjZcS29t6FTg&s",
    sabores: [],
    tipo: "serviço"
  },
  {
    id: 39,
    nome: "Cadeiras dobráveis",
    descricao: "Cadeiras dobráveis compactas para aluguel em festas e eventos.",
    categoria: "Estrutura",
    subcategoria: "Aluguel",
    preco: 20000,
    avaliacao: 4.6,
    loja: "Móveis para Eventos",
    foto: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQQlCi3ZB-MFhYLlOc6N5bfY7t3DGRhB1k7wrXO7iPJUYyVmEd24ixacuUVFR_dCauWh0fk_eJ0wMgZkSM3tyfYFs0Sj26dqwYdHQxJTtqhhPjglmVOX8t8gJzIoGvsjKZ9p969iw&usqp=CAc",
    sabores: [],
    tipo: "serviço"
  },
 
  // ─────────────────────────────────────────────
  // ENTRETENIMENTO – Serviço
  // ─────────────────────────────────────────────
  {
    id: 40,
    nome: "Palhaço",
    descricao: "Serviço de palhaço profissional para animação de festas infantis e eventos.",
    categoria: "Entretenimento",
    subcategoria: "Serviço",
    preco: 30000,
    avaliacao: 4.7,
    loja: "Entretenimento Feliz",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1KoNvD5Y8qZ232QcHsg_mNFL_dXNJTSiAAA&s",
    sabores: [],
    tipo: "serviço"
  },
  {
    id: 41,
    nome: "Fotógrafo Profissional",
    descricao: "Serviço de fotografia profissional para festas e eventos com câmera digital.",
    categoria: "Entretenimento",
    subcategoria: "Serviço",
    preco: 80000,
    avaliacao: 4.9,
    loja: "Clicks & Festa",
    foto: "https://img.freepik.com/fotos-gratis/bonitao-africano-com-corte-de-cabelo-elegante-tirando-foto-na-camera-digital_171337-1345.jpg?semt=ais_hybrid&w=740&q=80",
    sabores: [],
    tipo: "serviço"
  },
  {
    id: 42,
    nome: "Mágico",
    descricao: "Serviço de mágico profissional para apresentações em festas e eventos.",
    categoria: "Entretenimento",
    subcategoria: "Serviço",
    preco: 35000,
    avaliacao: 4.6,
    loja: "Magia & Alegria",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrpTQqqIo14sLFWd-E5UKZOL0AVwcm13hHkw&s",
    sabores: [],
    tipo: "serviço"
  },
  {
    id: 43,
    nome: "DJ para festa",
    descricao: "Serviço de DJ profissional com equipamento completo para animar festas e eventos.",
    categoria: "Entretenimento",
    subcategoria: "Serviço",
    preco: 60000,
    avaliacao: 4.8,
    loja: "DJ Beats",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG69F85nPeU7mzilgbiay-D2kbnekH1pZMcw&s",
    sabores: [],
    tipo: "serviço"
  },
  {
    id: 44,
    nome: "Filmagem aérea (Drone)",
    descricao: "Serviço de filmagem aérea com drone para registro profissional de eventos.",
    categoria: "Entretenimento",
    subcategoria: "Serviço",
    preco: 120000,
    avaliacao: 4.9,
    loja: "Drone Vídeo Eventos",
    foto: "https://cdn0.casamentos.com.br/vendor/4110/3_2/960/jpeg/drone-silvia-fregonese_13_214110.jpeg",
    sabores: [],
    tipo: "serviço"
  },
 
  // ─────────────────────────────────────────────
  // ENTRETENIMENTO – Aluguel
  // ─────────────────────────────────────────────
  {
    id: 45,
    nome: "Pula-pula Inflável",
    descricao: "Pula-pula inflável para aluguel em festas infantis e eventos.",
    categoria: "Entretenimento",
    subcategoria: "Aluguel",
    preco: 40000,
    avaliacao: 4.8,
    loja: "Brinquedos Infláveis SP",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrGR3NaWicGel7D1pQkaCFAn-Nexc_MbY0ZA&s",
    sabores: [],
    tipo: "serviço"
  },
  {
    id: 46,
    nome: "Carrossel Inflável",
    descricao: "Carrossel inflável para aluguel em festas e eventos infantis.",
    categoria: "Entretenimento",
    subcategoria: "Aluguel",
    preco: 55000,
    avaliacao: 4.7,
    loja: "Brinquedos Infláveis SP",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRKQ1slq7UYxLzhuRbACsba8_QkU0rkhXSyg&s",
    sabores: [],
    tipo: "serviço"
  },
  {
    id: 47,
    nome: "Tobogã Inflável",
    descricao: "Tobogã inflável para aluguel em festas e eventos ao ar livre.",
    categoria: "Entretenimento",
    subcategoria: "Aluguel",
    preco: 60000,
    avaliacao: 4.6,
    loja: "Diversão Inflável",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFtBOdU-lhPmnWuqRWctsBGWfGjZFgJqyZ4A&s",
    sabores: [],
    tipo: "serviço"
  },
  {
    id: 48,
    nome: "Máquina de Pipoca",
    descricao: "Máquina de pipoca para aluguel em festas, eventos e quermesses.",
    categoria: "Entretenimento",
    subcategoria: "Aluguel",
    preco: 15000,
    avaliacao: 4.8,
    loja: "Equipamentos Festa",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl8yxhu3F4Qd4dwK2YmtweZAIYtT3-7mbirA&s",
    sabores: [],
    tipo: "serviço"
  },
  {
    id: 49,
    nome: "Máquina de Algodão Doce",
    descricao: "Máquina de algodão doce para aluguel em festas e eventos.",
    categoria: "Entretenimento",
    subcategoria: "Aluguel",
    preco: 15000,
    avaliacao: 4.7,
    loja: "Equipamentos Festa",
    foto: "https://static.wixstatic.com/media/493774_16594d38d029448cbb33a0eb738f5e2d~mv2.jpg",
    sabores: [],
    tipo: "serviço"
  },
  {
    id: 50,
    nome: "Cama Elástica",
    descricao: "Cama elástica para aluguel em festas infantis e eventos esportivos.",
    categoria: "Entretenimento",
    subcategoria: "Aluguel",
    preco: 45000,
    avaliacao: 4.8,
    loja: "Brinquedos Infláveis SP",
    foto: "https://trampolimbrinquedos.com.br/wp-content/uploads/2021/03/305-2.jpeg",
    sabores: [],
    tipo: "serviço"
  }
];
 
async function seed() {
  try {
    console.log("Conectando ao MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado ✅");

    console.log("Apagando produtos antigos...");
    const deleted = await Product.deleteMany({});
    console.log(`Produtos apagados: ${deleted.deletedCount}`);

    console.log("Inserindo produtos novos...");
    const inserted = await Product.insertMany(produtos);
    console.log(`Produtos inseridos: ${inserted.length} 🚀`);

  } catch (err) {
    console.error("Erro ao rodar seed:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado do MongoDB");
  }
}

seed();