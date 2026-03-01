const comida = [
  {
    categoria: "salgados",
    itens: [
      {
        nome: "Coxinha", 
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQdGwVamn-0SDTsc6539xIfhy57vKDF2rHZQ&s",
        preco: "R$45,00",
        avaliacao: 4.7,
        loja: "Salgados da Maria"
      },
      {
        nome: "Esfiha",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrPuPuRH8gZZ7CN7L4HPCnjcPgmfr_hoRnjg&s",
        preco: "R$50,00",
        avaliacao: 4.5,
        loja: "Cantinho Árabe"
      },
      {
        nome: "Pastel",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyX11qsoEOA5n9P9wgENbPZBfSZH9627nBZQ&s",
        preco: "R$25,00",
        avaliacao: 4.6,
        loja: "Pastel & Cia"
      },
      {
        nome: "Kibe",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdfSsbk2LI6mxiz5TjGY9k4cDDkNBkg09z9A&s",
        preco: "R$40,00",
        avaliacao: 4.3,
        loja: "Salgados da Maria"
      },
      {
        nome: "Empada",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ-uJFsUwdj2cXMlQa19abuVIz3vjoitIioQ&s",
        preco: "R$35,00",
        avaliacao: 4.4,
        loja: "Empadas da Ana"
      },
      {
        nome: "Bolinho de Bacalhau",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtW5CgoQ6qENnDYVJ6Rmk8yfoo5o_cxbMHiQ&s",
        preco: "R$55,00",
        avaliacao: 4.8,
        loja: "Salgados do Porto"
      }
    ]
  },
  {
    categoria: "doces",
    itens: [
      {
        nome: "Brigadeiro",
        foto: "https://www.sabornamesa.com.br/media/k2/items/cache/5003d452a8da016f3ed02a6385cf54e8_XL.jpg",
        preco: "R$30,00",
        avaliacao: 4.9,
        loja: "Doces da Ana"
      },
      {
        nome: "Cupcake",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLx5Jdq8ZfMugqYboSyKWLy79uuUBIrY9Z6A&s",
        preco: "R$35,00",
        avaliacao: 4.6,
        loja: "Sweet Party"
      },
      {
        nome: "Beijinho",
        foto: "https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop_new/public/srh_recipes/8d6a0e43fea8d543981a3eb7d870f3b0.jpeg?itok=azWUsQbD",
        preco: "R$28,00",
        avaliacao: 4.7,
        loja: "Doces da Ana"
      },
      {
        nome: "Cookies",
        foto: "https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_mobile/public/srh_recipes/9034b04c2a91dfb5bea0d43956e196af.jpeg?itok=Gd9hyJDw",
        preco: "R$45,00",
        avaliacao: 4.8,
        loja: "Confeitaria Doce Lar"
      },
      {
        nome: "Churros",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ05bWS2JahzbufphcxZvPeTD0PJFlJ6yrjPA&s",
        preco: "R$25,00",
        avaliacao: 4.6,
        loja: "Churros & Cia"
      },
      {
        nome: "Brownie",
        foto: "https://static.itdg.com.br/images/640-400/0191a4f23349e54e618a65f2051d68a8/shutterstock-1915577575-2-.jpg",
        preco: "R$32,00",
        avaliacao: 4.5,
        loja: "Brownies da Casa"
      }
    ]
  },
  {
    categoria: "Bolos e Tortas",
    itens: [
      {
        nome: "Torta de chocolate",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJkFyz030728kDnKvLRU_sseViSqsQrSYI_Q&s",
        preco: "R$100,00",
        avaliacao: 4.2,
        loja: "Distribuidora Festa"
      },
      {
        nome: "Torta de Limão",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmDirNIfjsprWHp9BesE0-ydNyvqElgUZQTQ&s",
        preco: "R$120,00",
        avaliacao: 4.8,
        loja: "Vida Saudável"
      },
      {
        nome: "Bolo de Casamento",
        foto: "https://cdnm.westwing.com.br/glossary/uploads/br/2023/04/06141635/bolo-de-casamento-simples.png",
        preco: "R$800,00",
        avaliacao: 4.9,
        loja: "Distribuidora Festa"
      },
      {
        nome: "Torta de churros",
        foto: "https://www.receitasnestle.com.br/sites/default/files/styles/cropped_recipe_card_new/public/srh_recipes/c711813431ff9346d5375595faf50d75.jpg?itok=rSqIA9Hn",
        preco: "R$12,00",
        avaliacao: 4.4,
        loja: "Bebidas do Bar"
      },
      {
        nome: "bolo de Morango",
        foto: "https://receitatodahora.com.br/wp-content/uploads/2022/03/bolo-de-morango-com-chantilly-scaled.jpg",
        preco: "R$70,00",
        avaliacao: 4.7,
        loja: "Adega do João"
      },
      {
        nome: "Bolo de abacaxi",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgwh-lDlFKbAYi413EG7NNirtzy2QUkm77jA&s",
        preco: "R$15,00",
        avaliacao: 4.6,
        loja: "Vida Saudável"
      }
    ]
  }
];

export default comida;