import React from 'react'
import ProductItem from '../../product/components'
import { useGetFavoriteProductsByUserQuery } from '~/app/services/favorite'
import { getUserData } from '~/store/helper/getDataLocalStorage'

const Favorite = () => {
   const { user } = getUserData()
   const userId = React.useMemo(() => user?._id, [user])
   console.log('userId 1:: ::', userId)
   const { data: dataFavProApi } = useGetFavoriteProductsByUserQuery(userId)
   const likedProducts = dataFavProApi?.favorite?.products
  return (
    <div>
      <div className='grid grid-cols-1 w-full'>
        <div className='grid grid-cols-4 gap-4 my-5'>
          {likedProducts &&
            likedProducts?.map((item) => {
              const isLiked = likedProducts?.some((product: { _id: any }) => product?._id == item?._id)
              console.log('isLiked', isLiked)
              return <ProductItem key={item?._id} item={item} isLiked={isLiked} userId={userId}></ProductItem>
            })}
        </div>
      </div>
    </div>
  )
}

export default Favorite