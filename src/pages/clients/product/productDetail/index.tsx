import { useEffect, useState } from "react";
import {  useNavigate, useParams } from 'react-router-dom'
import { Modal, Rate, Tabs } from "antd";
import {formatPrice} from "~/utils/format";
import ProductItem from "../components";
import { useAddToCartMutation } from "~/app/services/cart";
import { getUserData } from "~/store/helper/getDataLocalStorage";
import { tabContentProductId } from "~/constans";
import DescriptionProduct from "../components/DescriptionProduct";
import { handleSuccess } from "~/utils/toast";
import ListReviewProduct from "../components/ListReviewProduct";
import { useGetFavoriteProductsByUserQuery } from "~/app/services/favorite";
import LoadingSkeleton from "~/components/loading/LoadingSkeleton";
import { useGetProductByCategoryIdClientQuery, useGetProductByIdClientQuery } from "~/app/services/client";
import CustomSlider from "~/components/slider/CustomSlider";
import BookItemSkeleton from "~/components/loading/BookItemSkeleton";
const ProductDetailPage = () => {
  const { id }: any = useParams()
  const { data: ProductByIdApi, isLoading: isLoadingProductById } = useGetProductByIdClientQuery(id)
  const dataProductById = ProductByIdApi?.product
  const categoryId = dataProductById?.category_id?._id
  const { data: dataProductByCate } = useGetProductByCategoryIdClientQuery(categoryId)
  const uniqueProductByCategory = dataProductByCate?.products?.filter((product) => product?._id !== id)
  let dataImage = dataProductById?.image
  const isQuantity = dataProductById?.quantity <= 0
  const [largeImage, setLargeImage] = useState('')
  // Cart
  const navigate = useNavigate()
  const { user: userData } = getUserData()
  const userId = userData?._id
  const [addToCart] = useAddToCartMutation()

  const handleThumbnailClick = (item: any) => {
    setLargeImage(item?.url)
  }
  /// slick der
  const totalImages = dataImage?.length || 0

  const desiredColumns = 4
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(desiredColumns, totalImages),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    initialSlide: 0,
    centerMode: false // Ensure slides are left-aligned
  }
  const settingsByProductCate = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 2,
    centerMode: true,
    className: 'center',
    centerPadding: '40px',
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          centerPadding: '30px'
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          centerPadding: '10px'
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '0px'
        }
      }
    ]
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  // add to cart
  // Input
  const [count, setCount] = useState(1)
  const handleIncrement = () => {
    setCount((count) => count + 1)
  }
  const handleDecrement = () => {
    if (count <= 1) return
    setCount((count) => count - 1)
  }
  const addToCartItem = async () => {
    const dataCart = {
      userId,
      quantity: Number(count),
      productId: id
    }
    try {
      const responsive = await addToCart({ data: dataCart }).unwrap()
      if (responsive?.cart) {
        handleSuccess('addToCart')
        navigate('/carts')
      }
    } catch (error: any) {
      console.log(error?.data?.message)
    }
  }

  // chính sách đổi trả
  const [isModalVisible, setIsModalVisible] = useState(false)
  const handleModalABD = () => {
    setIsModalVisible(true)
  }
  const handleModalClose = () => {
    setIsModalVisible(false)
  }

  // description
  const [activeTab, setActiveTab] = useState('description')
  const handleTabChange = (key: any) => {
    setActiveTab(key)
  }

  const TabPane = (tabContentProductId, id) => {
    return tabContentProductId.map((item) => {
      return {
        key: item.key,
        label: item.title,
        children:
          item.key === 'description' ? (
            <DescriptionProduct description={dataProductById?.description} />
          ) : (
            <ListReviewProduct productId={id} />
          )
      }
    })
  }
  // favorite
  const { data: dataFavProApi } = useGetFavoriteProductsByUserQuery(userId)
  const favoriteProducts = dataFavProApi?.favorite?.products
  const isFavorite = favoriteProducts?.some((product: { _id: any }) => product?._id == id)
  return (
    <>
      <div className='container mx-auto px-[50px]'>
        <nav aria-label='Breadcrumb' className='w-full my-5'>
          <div className='flex'>
            <span className='text-gray-500'>Trang chủ</span>
            <span className='mx-2 text-gray-400'> / </span>
            <span className='text-gray-500'>Sản phẩm</span>
            <span className='mx-2 text-gray-400'> / </span>
            <span className='text-blue-700 font-medium  '>{dataProductById?.name}</span>
          </div>
        </nav>
        <div className='grid md:grid-cols-7 gap-8 mb-10'>
          <div className='col-span-3 w-full'>
            <div className=' w-full p-4 rounded-lg shadow  border border-gray-50 min-h-[360px]  bg-white'>
              <div className='w-[360px] h-[400px] mx-auto text-center'>
                {isLoadingProductById ? (
                  <LoadingSkeleton className={'h-full'}></LoadingSkeleton>
                ) : (
                  <img
                    src={
                      largeImage
                        ? largeImage
                        : dataProductById?.image[0]?.url
                          ? dataProductById?.image[0]?.url
                          : 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'
                    }
                    className='w-full h-full object-cover block'
                  />
                )}
              </div>
            </div>
            <div className='col-span-3'>
              <ul className='w-full gird gap-x-5'>
                <CustomSlider settings={settings}>
                  {!isLoadingProductById
                    ? dataProductById?.image?.map((item: any, index: any) => (
                        <li
                          key={item?.publicId}
                          className='image-slide p-4 mt-2'
                          onClick={() => handleThumbnailClick(item)}
                        >
                          <img
                            src={item?.url || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'}
                            className='image-container h-[100px] cursor-pointer bg-white p-4 bg-cover bg-center rounded-sm shadow-md'
                            alt={`Image ${index + 1}`}
                          />
                        </li>
                      ))
                    : [1, 2, 3, 4].map((key) => (
                        <li key={key} className='image-slide p-4 mt-2 h-20'>
                          <LoadingSkeleton key={key} className={'h-full'} />
                        </li>
                      ))}
                </CustomSlider>
              </ul>
            </div>
          </div>
          <div className='col-span-4  p-4'>
            <h1 className='text-[30px] font-medium mb-5'>{dataProductById?.name}</h1>

            <div className='flex items-center justify-between mb-2'>
              <div className='flex-col'>
                <div className='mb-3'>
                  <span>Nhà cung cấp: </span>
                  <a className='text-black font-medium' href='#'>
                    {dataProductById?.supplier_id?.name}
                  </a>
                </div>
                <div className=''>
                  <span>Nhà xuất bản: </span>
                  <a className='text-black font-medium' href='#'>
                    {dataProductById?.publisher_id?.name}
                  </a>
                </div>
              </div>
              <div className='flex-col'>
                <div className='mb-3'>
                  <span>Tác giả: </span>
                  <a className='text-black font-medium' href='#'>
                    {dataProductById?.author_id?.name}
                  </a>
                </div>
                <div className=''>
                  <span>Kiểu sách: </span>
                  <a className='text-black font-medium' href='#'>
                    {dataProductById?.genre_id?.name}
                  </a>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-2 my-5'>
              <div>
                <Rate disabled value={dataProductById?.average_score} className='text-sm' />
                <span className='ml-2 text-sm'>({dataProductById?.average_score || 0} )</span>
              </div>
              <div className='text-[#4a9352] font-medium'>{0} Lượt xem</div>
              <div className='text-[#7a7b43] font-medium'>{1} Lượt bán</div>
            </div>
            <button onClick={() => handleModalABD()}>Chính sách đổi trả</button>
            <div className='mb-5'>
              <p>
                <span
                  className={` text-3xl font-medium ${
                    dataProductById?.discounted_price ? 'line-through text-gray-500' : 'text-primary'
                  } `}
                >
                  {formatPrice(dataProductById?.price) || 'Đang cập nhật'}
                </span>
                {dataProductById?.discounted_price > 0 && (
                  <span className='text-primary text-3xl font-medium ml-4'>
                    {formatPrice(dataProductById?.discounted_price) || 'Đang cập nhật'}
                  </span>
                )}
              </p>
            </div>
            <div className='grid grid-cols-5 items-center gap-x-2'>
              <div className='col-span-1 flex items-center text-center cursor-pointer'>
                <p
                  onClick={handleDecrement}
                  className='px-[15px] hover:shadow py-1 text-[#181819] text-xl border border-gray-300  rounded-s'
                >
                  -
                </p>
                <input
                  type='text'
                  value={count}
                  name='quantity'
                  onChange={(e) => e.target.value}
                  id=''
                  className='inline-block outline-none w-10 h-[38px] text-center border border-t-gray-300  text-[#171718] text-xl '
                />

                <p
                  onClick={handleIncrement}
                  className='px-[12px] py-1 hover:shadow  border border-gray-300 rounded-r text-[#111112] text-xl'
                >
                  +
                </p>
              </div>
              <button
                onClick={addToCartItem}
                disabled={isQuantity}
                className={`col-span-2 hover:shadow-md ml-4 ${
                  isQuantity ? `bg-[#234a99]` : `bg-[#1f66ef]`
                } rounded-full transition-all hover:bg-blue-800 text-white font-medium w-full p-2 text-center`}
              >
                {isQuantity ? 'Tạm thời hết hàng' : 'Mua hàng'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='mb-5'>
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          defaultActiveKey={activeTab}
          items={TabPane(tabContentProductId, id)}
        ></Tabs>
      </div>
      <div className='w-full mb-5'>
        <h3 className='text-2xl mb-5 font-medium'>Sản phẩm liên quan</h3>
        {isLoadingProductById && (
          <CustomSlider settings={settingsByProductCate}>
            {[1, 2, 3, 4, 5].map((key) => (
              <BookItemSkeleton key={key} />
            ))}
          </CustomSlider>
        )}
        {uniqueProductByCategory && uniqueProductByCategory.length > 0 ? (
          uniqueProductByCategory.length > settingsByProductCate.slidesToShow ? (
            <CustomSlider settings={settingsByProductCate}>
              {uniqueProductByCategory.map((item: any) => (
                <ProductItem key={item?._id} item={item} isFavorite={isFavorite} userId={userId} />
              ))}
            </CustomSlider>
          ) : (
            <div className='grid grid-cols-5 gap-4'>
              {uniqueProductByCategory.map((item: any) => (
                <ProductItem key={item?._id} item={item} isFavorite={isFavorite} userId={userId} />
              ))}
            </div>
          )
        ) : (
          <p>Cuốn sách không có danh mục liên quan</p>
        )}
      </div>
      <Modal
        title='Chính sách đổi trả'
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        className='w-[1000px]'
      >
        <div className='text-center text-black'>
          <h2 className='text-3xl font-medium'>CHÍNH SÁCH ĐỔI / TRẢ / HOÀN TIỀN</h2>
          <p className='text-xl'> Áp dụng cho toàn bộ đơn hàng của Quý Khách tại Fahasa.com</p>
        </div>
        <div className='text-center'>
          <div className='w-[360px] h-[360px]'>
            <img
              className='w-full h-full object-cover'
              src='https://cdn0.fahasa.com/media/wysiwyg/Hien_UI/QuyTrinhDoiTra/DoiTraHang400x400_01.svg'
              alt=''
            />
          </div>
          <div className='w-[360px] h-[360px]'>
            <img
              className='w-full h-full object-cover'
              src='https://cdn0.fahasa.com/media/wysiwyg/Hien_UI/QuyTrinhDoiTra/DoiTraHang400x400_02.svg'
              alt=''
            />
          </div>
          <div className='w-[360px] h-[360px]'>
            <img
              className='w-full h-full object-cover'
              src='https://cdn0.fahasa.com/media/wysiwyg/Hien_UI/QuyTrinhDoiTra/DoiTraHang400x400_03.svg'
              alt=''
            />
          </div>
        </div>
        <p>
          Chúng tôi luôn trân trọng sự tin tưởng và ủng hộ của quý khách hàng khi trải nghiệm mua hàng tại Fahasa.com.
          Do đó chúng tôi luôn cố gắng hoàn thiện dịch vụ tốt nhất để phục vụ mọi nhu cầu mua sắm của quý khách.
          Fahasa.com chúng tôi luôn luôn cam kết tất cả các sản phẩm bán tại Fahasa.com 100% là những sản phẩm chất
          lượng và xuất xứ nguồn gốc rõ ràng, hợp pháp cũng như an toàn cho người tiêu dùng. Để việc mua sắm của quý
          khách tại Fahasa.com là trải nghiệm dịch vụ thân thiện, chúng tôi hy vọng quý khách sẽ kiểm tra kỹ các nội
          dung sau trước khi nhận hàng: Thông tin sản phẩm: tên sản phẩm và chất lượng sản phẩm. Số lượng sản phẩm.
          Thông tin sản phẩm, người nhận (Đối chiếu với thông tin trên phiếu giao hàng được bỏ trong hộp) trong lúc nhận
          hàng trước khi ký nhận và thanh toán tiền cho nhân viên giao nhận. Trong trường hợp hiếm hoi sản phẩm quý
          khách nhận được có khiếm khuyết, hư hỏng hoặc không như mô tả, Fahasa.com cam kết bảo vệ khách hàng bằng chính
          sách đổi trả/ hoàn tiền trên tinh thần bảo vệ quyền lợi người tiêu dùng nhằm cam kết với quý khách về chất
          lượng sản phẩm và dịch vụ của chúng tôi. Khi quý khách hàng có hàng hóa mua tại Fahasa.comcần đổi/ trả/bảo
          hành/hoàn tiền, xin quý khách hàng liên hệ với chúng tôi qua hotline 1900636467 hoặc truy cập
          fahasa.com/chinh-sach-doi-tra-hang để tìm hiểu thêm về chính sách đổi/trả:
        </p>
      </Modal>
    </>
  )
}

export default ProductDetailPage