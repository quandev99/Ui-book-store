import Slider from 'react-slick'
const BannerHomePage = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000
  }
  return (
    <div className='w-full h-[500px] mb-10'>
      <Slider {...settings}>
        <div className='w-full h-full'>
          <img
            className='w-full h-full object-cover'
            src={'https://cdn0.fahasa.com/media/magentothem/banner7/Fahasa_saleT3_Tuan2_mainbanner_banner_840x320.jpg'}
            alt=''
          />
        </div>
        <div className='w-full h-full'>
          <img
            className='w-full h-full object-cover'
            src={'https://cdn0.fahasa.com/media/magentothem/banner7/Fahasa_saleT3_Tuan2_mainbanner_banner_840x320.jpg'}
            alt=''
          />
        </div>
        <div className='w-full h-full'>
          <img
            className='w-full h-full object-cover'
            src={'https://cdn0.fahasa.com/media/magentothem/banner7/Fahasa_saleT3_Tuan2_mainbanner_banner_840x320.jpg'}
            alt=''
          />
        </div>
        <div className='w-full h-full'>
          <img
            className='w-full h-full object-cover'
            src={'https://cdn0.fahasa.com/media/magentothem/banner7/Fahasa_saleT3_Tuan2_mainbanner_banner_840x320.jpg'}
            alt=''
          />
        </div>
      </Slider>
    </div>
  )
}

export default BannerHomePage
