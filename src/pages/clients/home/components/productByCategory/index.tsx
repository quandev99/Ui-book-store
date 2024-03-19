
import BookItemSkeleton from '~/components/loading/BookItemSkeleton'
import ProductItem from '~/pages/clients/product/components'
import { getUserData } from '~/store/helper/getDataLocalStorage'
import { useGetFavoriteProductsByUserQuery } from '~/app/services/favorite'
import React from 'react'
import { useGetProductByCategoryIdClientQuery } from '~/app/services/client'
import CustomSlider from '~/components/slider/CustomSlider'

const ProductByCate = () => {
  const id = '65573c32d12c597d294035b5'
  const { data: dataProductByCate, isLoading } = useGetProductByCategoryIdClientQuery(id as any)

  let settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 0,
    centerMode: true,
    className: 'center',
    centerPadding: '20px',
    autoplaySpeed: 2000,
    cssEase: 'linear',
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
            <CustomSlider settings={settings}>
              {[1, 2, 3, 4, 5].map((key) => (
                <BookItemSkeleton key={key} />
              ))}
            </CustomSlider>
          )}
          {dataProductByCate && dataProductByCate?.products?.length > 0 && (
            <CustomSlider settings={settings}>
              {dataProductByCate.products.map((item: any) => {
                const isFavorite = favoriteProducts?.some((product: { _id: any }) => product?._id == item?._id)
                return <ProductItem key={item._id} item={item} userId={userId} isFavorite={isFavorite} />})}
            </CustomSlider>
          )}
          {dataProductByCate?.products?.length === 0 && <p>Cuốn sách không có danh mục liên quan</p>}
        </div>
      </div>
  )
}

export default ProductByCate
