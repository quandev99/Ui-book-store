import { useGetAllCategoriesQuery } from '~/app/services/category'
import Slider from 'react-slick'
const CategoryNews = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
  }
   const { data: categoriesApi, isLoading: isLoadingCategory } = useGetAllCategoriesQuery()
   const dataCategories = categoriesApi?.categories.filter((category) => category?.parent)
  return (
    <div className='w-full mb-10'>
      <h2 className='text-2xl font-medium mb-8'>Danh mục nổi bật</h2>
      <Slider {...settings}>
        {dataCategories?.map((item: any) => (
          <div className='w-[120px] mr-2' key={item?._id}>
            <div className='w-[120px] h-[100px] mb-3'>
              <img className='w-full h-full object-cover' src={item?.image?.url} alt='' />
            </div>
            <h3 className='text-[18px] font-medium truncate'>{item.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default CategoryNews