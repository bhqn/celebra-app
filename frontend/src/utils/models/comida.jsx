const produtos = [
  {
    categoria: "comida",
    subcategorias: [
      {
        nome: "salgados",
        itens: [
          {
            id: 1,
            nome: "Coxinha",
            descricao: "Salgado frito em formato de gota recheado com frango desfiado.",
            sabores: ["frango", "frango com catupiry"],
            foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQdGwVamn-0SDTsc6539xIfhy57vKDF2rHZQ&s",
            preco: "R$45,00",
            avaliacao: 4.7,
            loja: "Salgados da Maria"
          },
          {
            id: 2,
            nome: "Esfiha",
            descricao: "Esfiha tradicional da culinária árabe assada.",
            sabores: ["carne", "queijo", "frango"],
            foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrPuPuRH8gZZ7CN7L4HPCnjcPgmfr_hoRnjg&s",
            preco: "R$50,00",
            avaliacao: 4.5,
            loja: "Cantinho Árabe"
          },
          {
            id: 3,
            nome: "Pastel",
            descricao: "Pastel crocante frito na hora.",
            sabores: ["carne", "queijo", "pizza"],
            foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyX11qsoEOA5n9P9wgENbPZBfSZH9627nBZQ&s",
            preco: "R$25,00",
            avaliacao: 4.6,
            loja: "Pastel & Cia"
          },
          {
            id: 4,
            nome: "Kibe",
            descricao: "Kibe crocante feito com trigo e carne temperada.",
            sabores: ["carne", "queijo"],
            foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdfSsbk2LI6mxiz5TjGY9k4cDDkNBkg09z9A&s",
            preco: "R$40,00",
            avaliacao: 4.3,
            loja: "Salgados da Maria"
          },
          {
            id: 5,
            nome: "Empada",
            descricao: "Empada assada com massa amanteigada.",
            sabores: ["frango", "palmito"],
            foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ-uJFsUwdj2cXMlQa19abuVIz3vjoitIioQ&s",
            preco: "R$35,00",
            avaliacao: 4.4,
            loja: "Empadas da Ana"
          },
          {
            id: 6,
            nome: "Bolinho de Bacalhau",
            descricao: "Bolinho tradicional português feito com bacalhau.",
            sabores: ["bacalhau"],
            foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtW5CgoQ6qENnDYVJ6Rmk8yfoo5o_cxbMHiQ&s",
            preco: "R$55,00",
            avaliacao: 4.8,
            loja: "Salgados do Porto"
          }
        ]
      },
      {
        nome: "doces",
        itens: [
          {
            id: 7,
            nome: "Brigadeiro",
            descricao: "Doce brasileiro feito com chocolate e leite condensado.",
            sabores: ["chocolate", "chocolate branco"],
            foto: "https://www.sabornamesa.com.br/media/k2/items/cache/5003d452a8da016f3ed02a6385cf54e8_XL.jpg",
            preco: "R$30,00",
            avaliacao: 4.9,
            loja: "Doces da Ana"
          },
          {
            id: 8,
            nome: "Cupcake",
            descricao: "Bolinho doce com cobertura cremosa.",
            sabores: ["chocolate", "baunilha", "morango"],
            foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLx5Jdq8ZfMugqYboSyKWLy79uuUBIrY9Z6A&s",
            preco: "R$35,00",
            avaliacao: 4.6,
            loja: "Sweet Party"
          },
          {
            id: 9,
            nome: "Beijinho",
            descricao: "Doce de coco com leite condensado.",
            sabores: ["coco"],
            foto: "https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop_new/public/srh_recipes/8d6a0e43fea8d543981a3eb7d870f3b0.jpeg?itok=azWUsQbD",
            preco: "R$28,00",
            avaliacao: 4.7,
            loja: "Doces da Ana"
          },
          {
            id: 10,
            nome: "Cookies",
            descricao: "Biscoito doce crocante com gotas de chocolate.",
            sabores: ["chocolate", "chocolate branco"],
            foto: "https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_mobile/public/srh_recipes/9034b04c2a91dfb5bea0d43956e196af.jpeg?itok=Gd9hyJDw",
            preco: "R$45,00",
            avaliacao: 4.8,
            loja: "Confeitaria Doce Lar"
          },
          {
            id: 11,
            nome: "Churros",
            descricao: "Massa frita crocante recheada.",
            sabores: ["doce de leite", "chocolate"],
            foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ05bWS2JahzbufphcxZvPeTD0PJFlJ6yrjPA&s",
            preco: "R$25,00",
            avaliacao: 4.6,
            loja: "Churros & Cia"
          },
          {
            id: 12,
            nome: "Brownie",
            descricao: "Bolo de chocolate denso e úmido.",
            sabores: ["chocolate", "chocolate com nozes"],
            foto: "https://static.itdg.com.br/images/640-400/0191a4f23349e54e618a65f2051d68a8/shutterstock-1915577575-2-.jpg",
            preco: "R$32,00",
            avaliacao: 4.5,
            loja: "Brownies da Casa"
          }
        ]
      },
      {
        nome: "bolos",
        itens: [
          {
            id: 13,
            nome: "Torta de chocolate",
            descricao: "Torta cremosa com recheio de chocolate.",
            sabores: ["chocolate", "meio amargo"],
            foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJkFyz030728kDnKvLRU_sseViSqsQrSYI_Q&s",
            preco: "R$100,00",
            avaliacao: 4.2,
            loja: "Distribuidora Festa"
          },
          {
            id: 14,
            nome: "Torta de Limão",
            descricao: "Torta gelada com creme de limão e merengue.",
            sabores: ["limão"],
            foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmDirNIfjsprWHp9BesE0-ydNyvqElgUZQTQ&s",
            preco: "R$120,00",
            avaliacao: 4.8,
            loja: "Vida Saudável"
          },
          {
            id: 15,
            nome: "Bolo de Casamento",
            descricao: "Bolo decorado especial para festas e casamentos.",
            sabores: ["baunilha", "chocolate", "red velvet"],
            foto: "https://cdnm.westwing.com.br/glossary/uploads/br/2023/04/06141635/bolo-de-casamento-simples.png",
            preco: "R$800,00",
            avaliacao: 4.9,
            loja: "Distribuidora Festa"
          },
          {
            id: 16,
            nome: "Torta de churros",
            descricao: "Torta inspirada no sabor de churros.",
            sabores: ["doce de leite", "canela"],
            foto: "https://www.receitasnestle.com.br/sites/default/files/styles/cropped_recipe_card_new/public/srh_recipes/c711813431ff9346d5375595faf50d75.jpg?itok=rSqIA9Hn",
            preco: "R$120,00",
            avaliacao: 4.4,
            loja: "Bebidas do Bar"
          },
          {
            id: 17,
            nome: "Bolo de Morango",
            descricao: "Bolo fofo recheado com morango e chantilly.",
            sabores: ["morango", "morango com chantilly"],
            foto: "https://receitatodahora.com.br/wp-content/uploads/2022/03/bolo-de-morango-com-chantilly-scaled.jpg",
            preco: "R$70,00",
            avaliacao: 4.7,
            loja: "Adega do João"
          },
          {
            id: 18,
            nome: "Bolo de Abacaxi",
            descricao: "Bolo doce com recheio de abacaxi.",
            sabores: ["abacaxi", "abacaxi com coco"],
            foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgwh-lDlFKbAYi413EG7NNirtzy2QUkm77jA&s",
            preco: "R$15,00",
            avaliacao: 4.6,
            loja: "Vida Saudável"
          }
        ]
      }
    ]
  }
];

export default produtos;