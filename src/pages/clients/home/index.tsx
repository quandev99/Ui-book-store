import BannerHomePage from "~/components/slider"
import ProductByCate from "./components/productByCategory"
import CategoryNews from "./components/categoryNews"

const HomePage = () => {
  return (
    <div>
      <BannerHomePage></BannerHomePage>
      <CategoryNews></CategoryNews>
      <ProductByCate></ProductByCate>
    </div>
  )
}


export default HomePage
