import BannerHomePage from "~/components/slider"
import ProductByCate from "./components/productByCategory"
import CategoryNews from "./components/categoryNews"
import { useEffect } from "react"

const HomePage = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const encodedToken = urlParams.get('token')
const getTokenFromURL = (encodedToken) => {
  if (encodedToken) {
    const tokenWithoutHash = encodedToken.replace(/#_=_/, '')
    try {
      const accessToken = JSON.parse(decodeURIComponent(tokenWithoutHash))
      localStorage.setItem('dataUsers', JSON.stringify(accessToken))
      window.history.replaceState({}, document.title, '/')
      //  window.location.replace('http://localhost:3001')
    } catch (error) {
      console.error('Failed to parse token:', error)
    }
  }
}
useEffect(() => {
  getTokenFromURL(encodedToken)
}, [encodedToken])

 
  return (
    <div>
      <BannerHomePage></BannerHomePage>
      <CategoryNews></CategoryNews>
      <ProductByCate></ProductByCate>
    </div>
  )
}


export default HomePage
