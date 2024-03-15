import React from 'react'
import { Link } from 'react-router-dom'
import { useAddFavoriteProductMutation } from '~/app/services/favorite'
import { formatPrice } from '~/utils/format'
import { handleError, handleSuccess } from '~/utils/toast'

const ProductItem = ({ item, isLiked, userId }) => {
  const { _id, image, name, price } = item || {}
  const [like, setLike] = React.useState(isLiked)
  React.useEffect(() => {
    setLike(isLiked)
  }, [isLiked])
  const [addFavoriteProduct] = useAddFavoriteProductMutation()
  const handleFavoriteProduct = async (id) => {
    if (!userId) return handleError('Bạn phải đăng nhập!')
    const data = {
      userId,
      productId: id
    }
    setLike(!like)
    const favoriteProduct = await addFavoriteProduct(data).unwrap()
    if (favoriteProduct) handleSuccess(favoriteProduct?.message)
  }
  return (
    <div className='flex flex-col h-full p-3 bg-white shadow-xl  rounded-lg select-none movie-cart'>
      <Link to='' className='overflow-hidden  rounded-md h-[250px]'>
        <div className='flex justify-between relative'>
          <span className='z-10 bg-[#f7941e] font-semibold text-white absolute top-2 left-2 p-2 rounded-full text-sm block'>
            {'8'} %
          </span>
          <span
            onClick={() => handleFavoriteProduct(_id)}
            className='bg-white shadow-xl absolute top-2 right-2 rounded-full w-9 h-9 flex items-center justify-center z-10'
            title={isLiked ? 'Bỏ yêu thích' : 'Yêu thích'}
          >
            {like ? (
              <svg xmlns='http://www.w3.org/2000/svg' width='21' height='19' viewBox='0 0 21 19' fill='none'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M10.2692 1.44024C4.30368 -3.83033 -9.62499 6.13372 10.5002 18.9C30.6254 6.13246 16.6954 -3.83285 10.7312 1.4415C10.6513 1.50997 10.5742 1.58142 10.5002 1.6557C10.4254 1.58136 10.3479 1.50954 10.2692 1.44024Z'
                  fill='#ee3131'
                ></path>
              </svg>
            ) : (
              <svg
                className='inline-block w-6 h-6'
                width='10'
                height='9'
                viewBox='0 0 10 9'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M5.00009 1.64882L4.55195 1.20663C3.50004 0.168629 1.57123 0.526828 0.874961 1.83182C0.548076 2.44562 0.474324 3.33182 1.07122 4.46281C1.64623 5.55181 2.84252 6.85621 5.00009 8.277C7.15765 6.85621 8.35331 5.55181 8.92896 4.46281C9.52585 3.33122 9.45272 2.44562 9.12521 1.83182C8.42894 0.526828 6.50013 0.168029 5.44823 1.20603L5.00009 1.64882ZM5.00009 9C-4.58333 2.92082 2.04937 -1.82397 4.89008 0.685827C4.92758 0.718827 4.96446 0.753027 5.00009 0.788427C5.03535 0.753059 5.07205 0.719033 5.11009 0.686427C7.95018 -1.82516 14.5835 2.92022 5.00009 9Z'
                  fill='#ee3131'
                ></path>
              </svg>
            )}
          </span>
        </div>
        <img
          src={image[0]?.url || 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png'}
          alt=''
          className='w-full hover:scale-105 h-full duration-300 transition-all  object-cover rounded-md mb-5'
        />
      </Link>
      <div className='flex flex-col flex-1 mt-4'>
        <h5 className='mb-2 hover:text-secondary  duration-200 transition-all truncate'>
          <Link to={`/products/${_id}`}>{name}</Link>
        </h5>
        <div className='flex items-center justify-between mb-10 text-sm '>
          <span className='font-bold text-[#CD151C] text-[15px]'>{formatPrice(price)}</span>
        </div>
        <button className='w-full py-2 text-white  duration-300 transition-all  rounded-lg cursor-pointer hover:text-primary bg-primary hover:bg-white hover:border  mt-auto'>
          Xem chi tiết
        </button>
      </div>
    </div>
  )
}

export default ProductItem


