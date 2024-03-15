import React from 'react'
import ProductItem from '../../product/components'
import { useGetFavoriteProductsByUserQuery } from '~/app/services/favorite'
import { getUserData } from '~/store/helper/getDataLocalStorage'

const Favorite = () => {
   const { user } = getUserData()
   const userId = React.useMemo(() => user?._id, [user])
   const { data: dataFavProApi } = useGetFavoriteProductsByUserQuery(userId)
   const favoriteProducts = dataFavProApi?.favorite?.products
  return (
    <div>
      <div className='grid grid-cols-1 w-full'>
        <div className='grid grid-cols-4 gap-4 my-5'>
          {favoriteProducts &&
            favoriteProducts?.map((item) => {
              const isFavorite = favoriteProducts?.some((product: { _id: any }) => product?._id == item?._id)
              return <ProductItem key={item?._id} item={item} isFavorite={isFavorite} userId={userId}></ProductItem>
            })}
        </div>
      </div>
    </div>
  )
}

export default Favorite