import { Modal, Rate, Spin, message } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { LoadingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAddReViewMutation } from '~/app/services/review'
import { useCreateImagesMutation } from '~/app/services/image'
import { useGetBillByIdQuery } from '~/app/services/bill'
import { handleSuccess } from '~/utils/toast'

const Reviews = ({ open, billId, setOpen }: { open: boolean; billId: any; setOpen: any }) => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  //image
  const [productImages, setProductImages] = useState<{ [key: string]: { files: File[]; url: string[] } }>({})
  const [createImages] = useCreateImagesMutation()
  const [addReview] = useAddReViewMutation()

  const handleFileChange = async (event: any, productId: string) => {
    const newImages = event.target.files ? Array.from(event.target.files) : []
    const oldImages = productImages[productId] ? productImages[productId].files : []
    // Kết hợp danh sách ảnh cũ với danh sách ảnh mới
    const combinedImages = [...oldImages, ...newImages]
    if (combinedImages.length > 10) {
      toast.error('Không vượt quá 10 ảnh')
      const ImageSplice = combinedImages.splice(0, 10)
      const imageUrls = ImageSplice.map((file: any) => URL.createObjectURL(file))
      const imagereq: any = { files: ImageSplice, url: imageUrls }
      setProductImages({ ...productImages, [productId]: imagereq })
    } else {
      const imageUrls = combinedImages.map((file: any) => URL.createObjectURL(file))
      const imagereq: any = { files: combinedImages, url: imageUrls }
      setProductImages({ ...productImages, [productId]: imagereq })
    }
  }

  const onHandleRemoveImage = async (index: number, productId: string) => {
    try {
      const fileImage = [...productImages[productId].files]
      const urlImage = [...productImages[productId].url]
      fileImage.splice(index, 1)
      urlImage.splice(index, 1)
      const updatedImages = { files: fileImage, url: urlImage }
      setProductImages({ ...productImages, [productId]: updatedImages })
    } catch (error) {
      console.log(error)
    }
  }

  const { data: BillDataApi } = useGetBillByIdQuery(billId)
  const billList = BillDataApi?.bill
  const { register, handleSubmit, control } = useForm<any>()

  const onHandleReview = async (value: any) => {
    setIsLoading(true)

    billList?.bill_details?.map(async (pro: any) => {
      const uploadPromises = productImages[pro.product_id]?.files?.map(async (file: any) => {
        const formData = new FormData()
        formData.append('images', file)
        return await createImages(formData as any).unwrap()
      })

      let updatedImages = []

      if (uploadPromises) {
        const data = await Promise.all(uploadPromises)
        updatedImages = data.map((item: any) => item?.data?.urls[0])
      }

      try {
        const formData: any = {
          user_id: billList?.user_id,
          bill_id: billId,
          product_id: value?.pro[pro.product_id]?.product_id,
          rating_start: value?.pro[pro.product_id]?.rating_start,
          comment: value?.pro[pro.product_id]?.comment || undefined,
          images: updatedImages
        }
        console.table(formData);
        // return 
        const data: any = await addReview(formData).unwrap()

        if (data.success) {
          handleSuccess('addReview')
          setOpen(false)
          navigate('/')
          window.location.reload()
        } else {
          message.success(data?.message)
        }
      } catch (error: any) {
        console.log(error)
        message.error(`${error.data.message}`)
      } finally {
        setIsLoading(false)
      }
    })

    // const results = await Promise.all(reviewPromises);
    // // Check if all reviews were successful
    // if (results.every(result => result?.data?.success)) {
    //     setOpen(false);
    //     message.success("Đánh giá thành công");
    //     // navigate("/account/bills");
    //     window.location.reload();
    // } else {
    //     message.error(results[0]?.error?.data?.message);
    // }
  }

  return (
    <div>
      {isLoading && <div className='fixed inset-0 bg-black opacity-50 z-50'></div>}

      {/* Spin component */}
      {isLoading && (
        <div className='fixed bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      )}
      <Modal
        title='Đánh giá sản phẩm'
        centered
        open={open}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        onCancel={() => setOpen(false)}
        // onOk={}
        width={800}
      >
        <form onSubmit={handleSubmit(onHandleReview)}>
          {billList?.bill_details?.map((pro: any, index: string) => {
            console.log('pro', pro)
            return (
              <div className='my-5' key={index}>
                <input type='hidden' defaultValue={pro.product_id} {...register(`pro[${pro.product_id}].product_id`)} />
                <div className='grid grid-cols-[50px,auto] gap-2 items-center'>
                  <div className='border w-[50px] h-[50px]'>
                    <img src={pro?.product_image} alt='no Image' className='w-full h-full' />
                  </div>
                  <div>
                    <h1 className='font-medium'>
                      <a href=''>{pro?.product_name}</a>
                    </h1>
                    <h1 className='font-medium'>
                      <a href=''>{pro?.createdAt?.slice(0, 10)?.split('-')?.reverse()?.join('-')}</a>
                    </h1>
                  </div>
                </div>
                <div className='py-5 flex items-center gap-4'>
                  <p>Chất lượng sản phẩm: </p>
                  <Controller
                    name={`pro[${pro.product_id}].rating_start`}
                    control={control}
                    defaultValue={5}
                    render={({ field }) => <Rate {...field} />}
                  />
                </div>
                <div className='bg-gray-50 min-h-[50px]'>
                  <div className='border shadow p-4'>
                    <textarea
                      id=''
                      {...register(`pro[${pro.product_id}].comment`)}
                      className='w-full outline-none border shadow-sm px-3 py-2'
                      rows={5}
                      placeholder='Mời bạn đánh giá sản phẩm'
                    ></textarea>

                    <div>
                      <div className='flex gap-2 bg-white  overflow-x-auto  min-h-[50px] p-2  shadow '>
                        {productImages[pro.product_id] &&
                          productImages[pro.product_id].url.map((image: any, index: number) => {
                            return (
                              <div key={index} className='min-h-[100px] border shadow-md bg-gray-200 h-[100px]'>
                                <span
                                  className='border cursor-pointer hover:bg-red-600 text-white transition-all duration-300 rounded-full bg-red-400 px-2 absolute '
                                  onClick={() => onHandleRemoveImage(index, pro.product_id)}
                                >
                                  x
                                </span>
                                <img src={image} className='w-full h-full object-cover' alt='Image' />
                              </div>
                            )
                          })}
                      </div>
                    </div>
                    <div className=''>
                      <input
                        type='file'
                        multiple
                        onChange={(event) => handleFileChange(event, pro.product_id)}
                        className='mt-4'
                        placeholder='Thêm ảnh'
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          <div className='mt-5 flex justify-between mb-4'>
            <button
              disabled={billList?.is_review}
              className=' border-gray-50 px-6 bg-[#ee4d2d] hover:bg-red-600 transition-all hover: py-1 shadow rounded-sm hover:shadow-sm text-white'
            >
              Đánh giá
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Reviews
