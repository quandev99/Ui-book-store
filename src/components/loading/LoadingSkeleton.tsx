
const LoadingSkeleton = (props) => {
  return (
    <div
      className={`skeleton ${props.className}`}
      style={{
        height: props.height,
        width: props.width,
        borderRadius: props.radius
      }}
    ></div>
  )
}

export default LoadingSkeleton
