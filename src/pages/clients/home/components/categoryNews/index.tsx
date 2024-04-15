import { useGetCategoriesClientQuery } from '~/app/services/client'
import CustomSlider from '~/components/slider/CustomSlider'
const CategoryNews = () => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  }
   const { data: categoriesApi, isLoading: isLoadingCategory } = useGetCategoriesClientQuery()
  return (
    <div className='w-full mb-10 '>
      <h2 className='text-2xl font-medium mb-8'>Danh mục nổi bật</h2>
      <CustomSlider settings={settings}>
        {categoriesApi?.categories?.map((item: any) => (
          <div key={item?._id} className='flex items-center'>
            <div className='w-[120px] ' key={item?._id}>
              <div className='w-full h-[100px] mb-3'>
                <img className='w-full h-full object-cover' src={item?.image?.url} alt='' />
              </div>
              <h3 className='text-[17px] w-40 text-center font-medium '>{item.name}</h3>
            </div>
          </div>
        ))}
      </CustomSlider>
    </div>
  )
}

export default CategoryNews