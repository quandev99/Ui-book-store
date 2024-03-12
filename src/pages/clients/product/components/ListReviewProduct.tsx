import React from 'react'
import { Pagination, Rate } from 'antd'
import { useGetReviewProductIdQuery } from '~/app/services/review';
const ListReviewProduct = ({productId}) => {
   const [page, setPage] = React.useState(1)
   const [limitPage] = React.useState(6)
    
     const dataQuery: any = {
       productId,
       limit: limitPage,
       page
     }
    const { data: dataReViewApi, isLoading, error } = useGetReviewProductIdQuery(dataQuery)
    const dataReview = dataReViewApi?.review ?? null;
     const totalItems = dataReViewApi?.pagination?.totalItems
     const onHandlePageChange = (page: number) => {
       setPage(page)
     }
    // if (error) {
    //   console.log('error', error)
    //   if ('data' in error) {
    //     if (error.data) {
    //       const errorWithMessage = error as { data: { message: string } }
    //       return (
    //         <div className='text-white p-4 text-2xl font-medium bg-blue-300'>
    //           Error: {errorWithMessage?.data?.message}
    //         </div>
    //       )
    //     }
    //   } else {
    //     // Xử lý trường hợp `error` không có thuộc tính 'data' ở đây
    //     return <div className='text-red-500 p-4 text-2xl font-medium bg-red-300'>Error: Error connect server</div>
    //   }
    // }
  return (
    <div>
      {dataReview?.length > 0 && !error ? (
        <div className='grid grid-cols-2 bg-white p-4 shadow-md'>
          {dataReview?.map((review: any, index: string) => {
            return (
              <div key={index} className='p-3 border shadow border-gray-50  grid grid-cols-7 gap-1'>
                <div>
                  <img
                    className='w-10 h-10 rounded-full border'
                    src={
                      review?.user_id?.avatar?.url ||
                      'https://i.pinimg.com/736x/e0/7a/22/e07a22eafdb803f1f26bf60de2143f7b.jpg'
                    }
                    alt=''
                  />
                </div>
                <div className='col-span-6'>
                  <h1 className='font-medium  text-[17px]'>{review?.user_name || review?.user_id?.name}</h1>
                  <div>
                    <Rate allowHalf value={review?.rating_start} />
                  </div>

                  <span className='text-gray-500 text-[13px]'>{new Date(review?.createdAt).toLocaleString()}</span>
                  <p>{review?.comment}</p>
                  <div className='flex gap-2 mt-2'>
                    {review?.images?.map((image: { url: string; publicId: string }) => {
                      return (
                        <div className='w-[60px] h-[60px] border'>
                          <img src={image?.url} alt='No Image' className='w-full h-full' />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className='text-white p-4 text-2xl font-medium bg-blue-300'>Error: Danh sách trống</div>
      )}

      <div className='text-center'>
        <Pagination
          defaultCurrent={page}
          total={totalItems}
          pageSize={1}
          onChange={onHandlePageChange}
          className='mt-5'
        />
      </div>
    </div>
  )
}

export default ListReviewProduct