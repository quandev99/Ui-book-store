import Slider from 'react-slick'

const CustomSlider = ({ settings, children }) => {
  function SampleNextArrow(props) {
    const { className, style, onClick, arrowClassName = '' } = props
    return (
      <div
        className={`${className} ${arrowClassName}`}
        style={{
          ...style,
          zIndex: 100,
          width: '50px',
          fontSize: '20px',
          display: 'flex',
          backgroundColor: '#c3c3c3',
          alignItems: 'center',
          justifyContent: 'center',
          height: '30px',
          borderRadius: '3px'
        }}
        onClick={onClick}
      />
    )
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{
          ...style,
          zIndex: 100,
          width: '50px',
          fontSize: '20px',
          display: 'flex',
          backgroundColor: '#c3c3c3',
          alignItems: 'center',
          justifyContent: 'center',
          height: '30px',
          borderRadius: '3px'
        }}
        onClick={onClick}
      />
    )
  }
  let customSetting = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    ...settings
  }
  return (
    <Slider {...customSetting}>
      {children}
    </Slider>
  )
}

export default CustomSlider
