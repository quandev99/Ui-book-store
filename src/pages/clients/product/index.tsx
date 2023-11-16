import { useEffect, useState } from 'react'

import ReactPaginate from 'react-paginate'

const dataFakePrice = [
  { value: { maxPrice: 50000 }, title: 'Dưới 50,000₫' },
  { value: { minPrice: 50000, maxPrice: 200000 }, title: '50,000₫ - 200,000₫' },
  {
    value: { minPrice: 200000, maxPrice: 300000 },
    title: '200,000₫ - 300,000₫'
  },
  {
    value: { minPrice: 300000, maxPrice: 500000 },
    title: '300,000₫ - 500,000₫'
  },
  { value: { maxPrice: 1000000 }, title: 'Dưới 1 triệu' },
  { value: { minPrice: 1000000 }, title: 'Trên 1 triệu' }
]
const ProductPage = () => {
  const [url, setUrl] = useState('')
 

  const pageCount = [1,2,3]?.pagination?.totalPages
  const [limit] = useState(10)
  const [page, setPage] = useState(1)
  const [sortValue, setSortValue] = useState('asc')

  const [categoryId, setCategoryId] = useState('')
  const [brandId, setBrandId] = useState('')
  const [colorId, setColorId] = useState('')
  const [sizeId, setSizeId] = useState('')
  const [search, setSearch] = useState('')
  const [checkboxStates, setCheckboxStates] = useState([])
  const [priceFilter, setPriceFilter] = useState()
  const handleCheckboxClick = (value: any) => {
    if (checkboxStates === value) {
      setCheckboxStates([]) // Bỏ chọn nếu đã chọn rồi
    } else {
      setCheckboxStates(value) // Chọn checkbox mới
    }
  }

  useEffect(() => {
    const queryString: any = Object.entries(checkboxStates)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
    setPriceFilter(queryString)
  }, [checkboxStates])

  useEffect(() => {
    if ([]) {
      setUrl(
        `?_page=${page}&_limit=${+limit}&_sort=createdAt&_order=${sortValue}&_category_id=${categoryId}&_brand_id=${brandId}&_size_id=${sizeId}&_color_id=${colorId}&_search=${
          search || ''
        }&${priceFilter}`
      )
    }
  }, [page, limit, sortValue, categoryId, brandId, colorId, sizeId, search, priceFilter])

  ///select option
  const handlePageClick = (event: any) => {
    setPage(event.selected + 1)
  }
  const handleSortCategory = (id: any) => {
    if (categoryId === id) {
      setCategoryId('')
    } else {
      setCategoryId(id)
    }
  }

  const handleSortBrand = (id: any) => {
    if (brandId === id) {
      setBrandId('')
    } else {
      setBrandId(id)
    }
  }
  const handleSortColor = (id: any) => {
    if (colorId === id) {
      setColorId('')
    } else {
      setColorId(id || '')
    }
  }
  const handleSortSize = (id: any) => {
    if (sizeId === id) {
      setSizeId('')
    } else {
      setSizeId(id || '')
    }
  }
  const handleSearchInputChange = (event: any) => {
    setSearch(event.target.value)
  }
  return (
    <>
      <main className=' w-main mx-auto'>
        <div className=' px-2 md:px-5'>
          <nav aria-label='Breadcrumb' className='w-[180px] my-5'>
            <div className='flex'>
              <span>Trang chủ</span>
              <span className='mx-2 text-gray-400'> / </span>
              <span>Sản phẩm</span>
            </div>
          </nav>
        </div>
        <div className='product_content page-container px-2 md:px-5'>
          <div className='grid md:grid-cols-5 gap-4'>
            <div className='col-span-1 '>
              <div className='product_category mb-5 border-gray-100 bg-white border shadow rounded-lg py-2'>
                <h4 className='text-xl text-center border border-gray-50 bg-gray-50  shadow-sm  mt-3 font-bold'>
                  Tìm kiếm sản phẩm
                </h4>
                <ul className='grid grid-cols-4 md:grid-cols-1 gap-3 w-[350px] md:w-[200px] md:ml-3 border-gray-300 pt-3'>
                  <li className='cursor-pointer  md:text-[15px] py-1 duration-300 transition-all '>
                    <div className='relative border border-gray-100  hover:shadow-sm ml-4 px-2 pr-10 rounded-md'>
                      <input
                        value={search} // Đặt giá trị trường nhập liệu bằng searchValue
                        onChange={handleSearchInputChange}
                        type='text'
                        placeholder='Tìm kiếm giày...'
                        className='w-full  py-2 shadow-sm sm:text-sm outline-none'
                      />

                      <span className='absolute inset-y-0 end-0 grid w-10 place-content-center'>
                        <button type='button' className='text-gray-600 hover:text-gray-700'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke-width='1.5'
                            stroke='currentColor'
                            className='h-4 w-4'
                          >
                            <path
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                            />
                          </svg>
                        </button>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className='product_category  mb-5 border-gray-100 bg-white border shadow rounded-lg py-2'>
                <h4 className='text-xl  text-center border border-gray-50 bg-gray-50  shadow-sm  mb-5  mt-3 font-bold'>
                  Danh mục sản phẩm
                </h4>
                <ul className=' border-gray-300  pt-3'>
                  {[
                    { _id: 'adsaassad', category_name: 'asdsadasdasd' },
                    { _id: 'adsaassads', category_name: 'asdsadsasdasd' }
                  ]?.map((category: any) => (
                    <li
                      key={category?._id}
                      className='cursor-pointer border border-gray-50 flex gap-2 group items-center hover:text-[#fb7317] hover:shadow-md md:text-[15px] px-3 py-1 duration-300 transition-all '
                    >
                      <input
                        type='checkbox'
                        name={category?.category_name}
                        className='cursor-pointer '
                        id={category?.category_name}
                        onClick={() => handleSortCategory(category?._id)}
                        checked={categoryId === category?._id}
                      />
                      <label htmlFor={category?.category_name} className='block w-full'>
                        <h1 className='cursor-pointer transition-all group-hover:text-[#fb7317]'>
                          {category?.category_name}
                        </h1>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='product_category  mb-5 border-gray-100 bg-white border shadow rounded-lg py-2'>
                <h4 className='text-xl  text-center border border-gray-50 bg-gray-50  shadow-sm  mb-5  mt-3 font-bold'>
                  Thương hiệu
                </h4>
                <ul className='border-gray-300  pt-3'>
                  {[
                    { _id: 'adsaasssad', brand_name: 'asdswadasdasd' },
                    { _id: 'adsaaswsads', brand_name: 'asdsawdsasdasd' }
                  ]?.map((brand: any) => (
                    <li
                      key={brand?._id}
                      className='cursor-pointer border border-gray-50 flex gap-2 group items-center hover:text-[#fb7317] hover:shadow-md md:text-[15px] px-3 py-1 duration-300 transition-all '
                    >
                      <input
                        type='checkbox'
                        className='cursor-pointer '
                        name={brand?.brand_name}
                        id={brand?.brand_name}
                        onClick={() => handleSortBrand(brand?._id)}
                        checked={brandId === brand?._id}
                      />
                      <label htmlFor={brand?.brand_name} className='block w-full'>
                        <h1 className='cursor-pointer transition-all group-hover:text-[#fb7317]'>
                          {brand?.brand_name}
                        </h1>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='product_category  mb-5 border-gray-100 bg-white border shadow rounded-lg py-2'>
                <h4 className='text-xl  text-center border border-gray-50 bg-gray-50  shadow-sm  mb-5  mt-3 font-bold'>
                  Lọc giá
                </h4>
                <ul className='grid grid-cols-4 md:grid-cols-1 gap-3 w-[350px] md:w-[200px] md:ml-3 border-gray-300  pt-3'>
                  {[
                    { title: 'adsaawsssad', value: 'asdswadasdasd' },
                    { title: 'adsaaswwsads', value: 'asdsawdsasdasd' }
                  ]?.map((item) => (
                    <li
                      key={item.title}
                      className='cursor-pointer border border-gray-50 flex gap-2 group items-center hover:text-[#fb7317] hover:shadow-md md:text-[15px] px-3 py-1 duration-300 transition-all '
                    >
                      <input
                        type='checkbox'
                        className='cursor-pointer'
                        name={item.title}
                        id={item.title}
                        onClick={() => handleCheckboxClick(item?.value)}
                        checked={checkboxStates === (item?.value as any)}
                      />
                      <label htmlFor={item?.title} className='block w-full'>
                        <h1 className='cursor-pointer'>{item?.title}</h1>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

      

        
            </div>
            <div className='col-span-4'>
              <div className='grid grid-cols-1 w-full'>
                <div className='flex justify-between w-full'>
                  <div>
                    {/* <span className="text-[30px]">Sneaker</span> */}
                    <span className='ml-5'>({[]?.length}) sản phầm</span>
                  </div>
                  <div className=' flex items-center  justify-between'>
                    <div className='mr-4 md:text-[15px] text-xl font-medium'>Sắp xếp:</div>
                    <select
                      className='px-2 py-2 md:text-[15px] outline-none transition-all cursor-pointer text-[12px] rounded border'
                      value={sortValue}
                      onChange={(e) => setSortValue(e.target.value)}
                    >
                      <option value='asc'>Cũ nhất</option>
                      <option value='desc'>Mới nhất</option>
                      {/* <option value="">Từ A {"-"} Z</option> */}
                      {/* <option value="">Sản phẩm nổi bật</option> */}
                      {/* <option value="">Từ Z {"-"} A</option> */}
                      {/* <option value="">Giá: Tăng dần </option>
                      <option value="">Giá: Giảm dần </option>
                      <option value="">Bán chạy nhất</option> */}
                    </select>
                  </div>
                </div>
              </div>
              {!true ? (
                <div className='grid grid-cols-1 w-full'>
                  <div className='grid grid-cols-4 gap-4 my-5'>
                    {[]?.map((item: any) => {
                      return <ProductFeature key={item._id} product={item} />
                    })}
                  </div>
                  <div className='grid grid-cols-1'>
                    <ol className='flex items-center justify-center grid-cols-1 gap-1 text-xs font-medium w-full py-10'>
                      <ReactPaginate
                        hrefBuilder={() => {
                          return '#'
                        }}
                        breakLabel='...'
                        nextLabel='>'
                        onPageChange={handlePageClick}
                        pageCount={pageCount}
                        disableInitialCallback={true}
                        previousLabel='<'
                        renderOnZeroPageCount={null}
                        className='mb-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-[6px] text-[15px]  text-gray-500 lg:gap-x-3 lg:text-base lg:mb-0 '
                        pageLinkClassName='bg-white bg-opacity-80 border page-link transition-all hover:bg-opacity-100 hover:bg-gray-100 py-1 px-2 rounded-[5px]'
                        previousClassName='bg-white nextPage bg-opacity-80 shadow-sm transition-all hover:bg-gray-600 hover:text-white  block border text-gray-500 transition-all hover:bg-opacity-100 py-1 px-[10px] rounded-md'
                        nextClassName='bg-white nextPage bg-opacity-80 shadow-sm transition-all hover:bg-gray-600 hover:text-white  block border text-gray-500 transition-all hover:bg-opacity-100 py-1 px-[10px] rounded-md'
                        activeClassName='page-active text-primary'
                        disabledClassName='opacity-40'
                        disabledLinkClassName='hover:cursor-default'
                      />
                    </ol>
                  </div>
                </div>
              ) : (
                <div>Không tìm thấy sản phẩm nào</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ProductPage
