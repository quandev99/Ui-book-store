import { Link } from 'react-router-dom'

const ProductItem = (item: any) => {
  const { _id, image, name, price } = item?.item || {}

  return (
    <div className='flex flex-col h-full p-3 bg-white rounded-lg select-none movie-cart'>
      <Link to={`/products/${_id}`} className='overflow-hidden rounded-md h-[250px]'>
        <span className='absolute z-10 bg-yellow-300 px-3'>{"8"} %</span>
        <img
          src={image[0]?.url}
          alt=''
          className='w-full hover:scale-105 h-full duration-300 transition-all  object-cover rounded-md mb-5'
        />
      </Link>
      <div className='flex flex-col flex-1 mt-4'>
        <h5 className='mb-2 hover:text-secondary  duration-200 transition-all'>
          <Link to=''>{name}</Link>
        </h5>
        <div className='flex items-center justify-between mb-10 text-sm '>
          <span className='font-bold text-[#CD151C] text-[15px]'>{price}</span>
        </div>
        <button className='w-full py-2 text-white  duration-300 transition-all  rounded-lg cursor-pointer hover:text-primary bg-[#fcaf17] hover:bg-white hover:border border-secondary mt-auto'>
          Xem chi tiết
        </button>
      </div>
    </div>
  )
}

export default ProductItem
