
import { useGetProductByCateQuery } from '~/app/services/product'
import BookItemSkeleton from '~/components/loading/BookItemSkeleton'
import ProductItem from '~/pages/clients/product/components'
import Slider from 'react-slick'
import { getUserData } from '~/store/helper/getDataLocalStorage'
import { useGetFavoriteProductsByUserQuery } from '~/app/services/favorite'
import React from 'react'

const ProductByCate = () => {
  const id = '65573c32d12c597d294035b5'
  const { data: dataProductByCate, isLoading } = useGetProductByCateQuery(id as any)

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
 const { user } = getUserData()
 const userId = React.useMemo(() => user?._id, [user])
 const { data: dataFavProApi } = useGetFavoriteProductsByUserQuery(userId)
 const favoriteProducts = dataFavProApi?.favorite?.products
  return (
      <div className='w-full mb-5'>
        <h3 className='text-2xl font-medium'>Những cuốn sách thuộc danh mục Tiểu Thuyết</h3>
        <div className='mt-[15px]'>
          {isLoading && (
            <Slider {...settings}>
              {[1, 2, 3, 4, 5].map((key) => (
                <BookItemSkeleton key={key} />
              ))}
            </Slider>
          )}
          {dataProductByCate && dataProductByCate?.products?.length > 0 && (
            <Slider {...settings}>
              {dataProductByCate.products.map((item: any) => {
                const isFavorite = favoriteProducts?.some((product: { _id: any }) => product?._id == item?._id)
                return <ProductItem key={item._id} item={item} userId={userId} isFavorite={isFavorite} />})}
            </Slider>
          )}
          {dataProductByCate?.products?.length === 0 && <p>Cuốn sách không có danh mục liên quan</p>}
        </div>
      </div>
  )
}

export default ProductByCate
