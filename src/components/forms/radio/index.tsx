import { useController } from 'react-hook-form'

const Radio = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: props.value
  })
  return (
    <label className='custom-radio cursor-pointer '>
      <input type='radio' {...field} value={props.value} checked={props.checked} className='hidden' />
      <div className='w-full h-full rounded-full bg-white transition-all'></div>
    </label>
  )
}

export default Radio