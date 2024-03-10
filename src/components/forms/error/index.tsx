
const ErrorInput = ({ message, ...props }) => {
  // console.log("Input Hook:", control, props);
  return (
    <p className={props.className} {...props}>
      {message}
    </p>
  )
}

export default ErrorInput
