import LoadingSkeleton from './LoadingSkeleton'

const BookItemSkeleton = () => {
  return (
    <div className='flex flex-col h-full p-3 text-white rounded-lg select-none movie-cart bg-slate-300 mr-3'>
      <LoadingSkeleton width='100%' height='250px' className='mb-5 rounded-xl'></LoadingSkeleton>
      <div className='flex flex-col flex-1'>
        <h3>
          <LoadingSkeleton width='100%' height='10px' radius='8px' className='mb-5'></LoadingSkeleton>
        </h3>
        <div className='flex justify-between mb-10 text-sm flex-item'>
          <span>
            <LoadingSkeleton width='60px' height='10px' radius='8px'></LoadingSkeleton>
          </span>
            <LoadingSkeleton width='60px' height='10px' radius='8px'></LoadingSkeleton>
        </div>
        <LoadingSkeleton width='100%' height='40px' radius='8px'></LoadingSkeleton>
      </div>
    </div>
  )
}

export default BookItemSkeleton
