
import CategoryCarousel from "../../components/CategoryCarousel/CategoryCarousel"
import Card from "../../components/card/Card"
function Food (){
    return(
        <>
<CategoryCarousel title="Salgados">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </CategoryCarousel>
          <CategoryCarousel title="Doces">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </CategoryCarousel>
          <CategoryCarousel title="Outros">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </CategoryCarousel>

        </>
    )
}

export default Food