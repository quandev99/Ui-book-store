import { useEffect, useState } from 'react'

import ReactPaginate from 'react-paginate'
import { useGetAllProductsByClientQuery, useGetAllProductsQuery } from '~/app/services/product'
import ProductItem from './components'
import { useGetAllCategoriesQuery } from '~/app/services/category'
import { useGetAllGenresQuery } from '~/app/services/genre'
import { useGetAllSuppliersQuery } from '~/app/services/supplier'
import { useGetAllPublishersQuery } from '~/app/services/publisher'
import { useGetAllAuthorsQuery } from '~/app/services/author'
import BookItemSkeleton from '~/components/loading/BookItemSkeleton'

const dataFakePrice = [
  { value: { _minPrice: 0, _maxPrice: 150000 }, title: '0₫ - 150,000₫' },
  {
    value: { _minPrice: 150000, _maxPrice: 300000 },
    title: '150,000₫ - 300,000₫'
  },
  {
    value: { _minPrice: 300000, _maxPrice: 500000 },
    title: '300,000₫ - 500,000₫'
  },
  { value: { _minPrice: 500000 }, title: '500,000₫ trở lên' }
]
const ProductPage = () => {
  const [url, setUrl] = useState('')
   const { data: productsApi, isLoading, error } = useGetAllProductsByClientQuery(url as any)
  const dataProducts = productsApi?.products;
   const { data:categoriesApi} = useGetAllCategoriesQuery()
   const categories = categoriesApi?.categories?.filter((category) => category?.parent)
    const { data: gendersApi} = useGetAllGenresQuery()
    const dataGenres = gendersApi?.genres
   const { data: suppliersApi } = useGetAllSuppliersQuery()
   const dataSuppliers = suppliersApi?.suppliers
    const { data: publishersApi } = useGetAllPublishersQuery()
    const dataPublishers = publishersApi?.publishers
    const { data: authorsApi } = useGetAllAuthorsQuery()
    const dataAuthors = authorsApi?.authors
  const pageCount = productsApi?.pagination?.totalPages
  const [limit] = useState(10)
  const [page, setPage] = useState(1)
  const [sortValue, setSortValue] = useState('asc')

  const [categoryId, setCategoryId] = useState('')
  const [genderId, setGenderId] = useState('')
  const [supplierId, setSupplierId] = useState('')
  const [publisherId, setPublisherId] = useState('')
  const [authorId, setAuthor] = useState('')
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
    if (dataProducts) {
      setUrl(
        `?_page=${page}&_limit=${+limit}&_sort=createdAt&_order=${sortValue}&_category_id=${categoryId}&_supplier_id=${supplierId}&_publisher_id=${publisherId}&_author_id=${authorId}&_genre_id=${genderId}&_search=${search}&${priceFilter}`
      )
    }
  }, [page, limit, sortValue, categoryId, genderId, authorId, supplierId, publisherId, search, priceFilter])

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

  const handleSortGender = (id: any) => {
    if (genderId === id) {
      setGenderId('')
    } else {
      setGenderId(id)
    }
  }
  const handleSortSupplier = (id: any) => {
    if (supplierId === id) {
      setSupplierId('')
    } else {
      setSupplierId(id || '')
    }
  }
  const handlePublisher = (id: any) => {
    if (publisherId === id) {
      setPublisherId('')
    } else {
      setPublisherId(id || '')
    }
  }
  const handleAuthor = (id: any) => {
    if (authorId === id) {
      setAuthor('')
    } else {
      setAuthor(id || '')
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
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='h-4 w-4'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
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
                  {categories?.map((category: any) => (
                    <li
                      key={category?._id}
                      className='cursor-pointer border border-gray-50 flex gap-2 group items-center hover:text-[#fb7317] hover:shadow-md md:text-[15px] px-3 py-1 duration-300 transition-all '
                    >
                      <input
                        type='checkbox'
                        name={category?.name}
                        className='cursor-pointer '
                        id={category?.name}
                        onClick={() => handleSortCategory(category?._id)}
                        checked={categoryId === category?._id}
                      />
                      <label htmlFor={category?.name} className='block w-full'>
                        <h1 className='cursor-pointer transition-all group-hover:text-[#fb7317]'>{category?.name}</h1>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='product_category  mb-5 border-gray-100 bg-white border shadow rounded-lg py-2'>
                <h4 className='text-xl  text-center border border-gray-50 bg-gray-50  shadow-sm  mb-5  mt-3 font-bold'>
                  Loại sách
                </h4>
                <ul className='border-gray-300  pt-3'>
                  {dataGenres?.map((gender: any) => (
                    <li
                      key={gender?._id}
                      className='cursor-pointer border border-gray-50 flex gap-2 group items-center hover:text-[#fb7317] hover:shadow-md md:text-[15px] px-3 py-1 duration-300 transition-all '
                    >
                      <input
                        type='checkbox'
                        className='cursor-pointer '
                        name={gender?.name}
                        id={gender?.name}
                        onClick={() => handleSortGender(gender?._id)}
                        checked={genderId === gender?._id}
                      />
                      <label htmlFor={gender?.name} className='block w-full'>
                        <h1 className='cursor-pointer transition-all group-hover:text-[#fb7317]'>{gender?.name}</h1>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='product_category  mb-5 border-gray-100 bg-white border shadow rounded-lg py-2'>
                <h4 className='text-xl  text-center border border-gray-50 bg-gray-50  shadow-sm  mb-5  mt-3 font-bold'>
                  Nhà Cung Cấp
                </h4>
                <ul className='border-gray-300  pt-3'>
                  {dataSuppliers?.map((supplier: any) => (
                    <li
                      key={supplier?._id}
                      className='cursor-pointer border border-gray-50 flex gap-2 group items-center hover:text-[#fb7317] hover:shadow-md md:text-[15px] px-3 py-1 duration-300 transition-all '
                    >
                      <input
                        type='checkbox'
                        className='cursor-pointer '
                        name={supplier?.name}
                        id={supplier?.name}
                        onClick={() => handleSortSupplier(supplier?._id)}
                        checked={supplierId === supplier?._id}
                      />
                      <label htmlFor={supplier?.name} className='block w-full'>
                        <h1 className='cursor-pointer transition-all group-hover:text-[#fb7317]'>{supplier?.name}</h1>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='product_category  mb-5 border-gray-100 bg-white border shadow rounded-lg py-2'>
                <h4 className='text-xl  text-center border border-gray-50 bg-gray-50  shadow-sm  mb-5  mt-3 font-bold'>
                  Nhà Phát Hành
                </h4>
                <ul className='border-gray-300  pt-3'>
                  {dataPublishers?.map((publisher: any) => (
                    <li
                      key={publisher?._id}
                      className='cursor-pointer border border-gray-50 flex gap-2 group items-center hover:text-[#fb7317] hover:shadow-md md:text-[15px] px-3 py-1 duration-300 transition-all '
                    >
                      <input
                        type='checkbox'
                        className='cursor-pointer '
                        name={publisher?.name}
                        id={publisher?.name}
                        onClick={() => handlePublisher(publisher?._id)}
                        checked={supplierId === publisher?._id}
                      />
                      <label htmlFor={publisher?.name} className='block w-full'>
                        <h1 className='cursor-pointer transition-all group-hover:text-[#fb7317]'>{publisher?.name}</h1>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='product_category  mb-5 border-gray-100 bg-white border shadow rounded-lg py-2'>
                <h4 className='text-xl  text-center border border-gray-50 bg-gray-50  shadow-sm  mb-5  mt-3 font-bold'>
                  Tác giả
                </h4>
                <ul className='border-gray-300  pt-3'>
                  {dataAuthors?.map((author: any) => (
                    <li
                      key={author?._id}
                      className='cursor-pointer border border-gray-50 flex gap-2 group items-center hover:text-[#fb7317] hover:shadow-md md:text-[15px] px-3 py-1 duration-300 transition-all '
                    >
                      <input
                        type='checkbox'
                        className='cursor-pointer '
                        name={author?.name}
                        id={author?.name}
                        onClick={() => handleAuthor(author?._id)}
                        checked={authorId === author?._id}
                      />
                      <label htmlFor={author?.name} className='block w-full'>
                        <h1 className='cursor-pointer transition-all group-hover:text-[#fb7317]'>{author?.name}</h1>
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
                  {dataFakePrice?.map((item) => (
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
                    <span className='text-[30px]'>Sách</span>
                    <span className='ml-5'>({(!error && dataProducts?.length) || 0}) sản phầm</span>
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
              <div className='grid grid-cols-1 w-full'>
                <div className='grid grid-cols-4 gap-4 my-5'>
                  {isLoading && [1, 2, 3,4,5,6,7,8,9,10]?.map(() => <BookItemSkeleton></BookItemSkeleton>)}
                </div>
              </div>
              {!error && dataProducts ? (
                <div className='grid grid-cols-1 w-full'>
                  <div className='grid grid-cols-4 gap-4 my-5'>
                    {dataProducts?.length > 0 &&
                      dataProducts?.map((item) => <ProductItem key={item._id} item={item}></ProductItem>)}
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
                <div className='text-red-400 bg-red-200 p-2'>Không tìm thấy cuốn sách nào</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ProductPage
