import { useController } from 'react-hook-form'

const InputHook = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: ''
  })
  // console.log("Input Hook:", control, props);
  return <input className={props.className} {...field} {...props} />
}

export default InputHook
