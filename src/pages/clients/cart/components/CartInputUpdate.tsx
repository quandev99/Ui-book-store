import React from 'react'

const QuantityInput = ({ product, onIncrease, onDecrease, onUpdate }) => {
 const [inputValue, setInputValue] = React.useState(product.quantity)
 const initialQuantityRef = React.useRef(product.quantity)

  React.useEffect(() => {
    setInputValue(product.quantity)
    initialQuantityRef.current = product.quantity
  }, [product.quantity])

 const handleBlur = () => {
    if (isNaN(inputValue)) {
      onUpdate(1)
    } else {
      onUpdate(inputValue)
    }
 }

 const handleChange = (e) => {
  const value = e.target.value
  if (isNaN(value)) {
    setInputValue(1)
  } else {
    setInputValue(value)
  }
 }

 React.useEffect(() => {
   return () => {
     // Revert inputValue to the initial quantity if there is an error
     setInputValue(initialQuantityRef.current)
   }
 }, [])


  return (
    <div className='flex items-center justify-center cursor-pointer w-full'>
      <p
        onClick={onDecrease}
        className='px-[12px] bg-white py-[2px] text-[#181819] text-center text-xl hover:shadow transition-all border border-gray-200 rounded-l'
      >
        -
      </p>
      <input
        // type='number'
        value={inputValue}
        name='quantity'
        className='inline-block w-10 outline-none h-[35px] text-center border border-gray-200 text-[#171718] text-xl'
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <p
        onClick={onIncrease}
        className='px-[12px] bg-white py-[2px] border border-gray-200 hover:shadow transition-all rounded-r text-[#111112] text-xl'
      >
        +
      </p>
    </div>
  )
}

export default QuantityInput
