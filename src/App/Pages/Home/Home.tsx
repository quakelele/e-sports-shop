import { useState } from 'react'
import { SearchBar } from '../../Components/SearchBar/SearchBar'
import { Location } from '../../Components/Location/Location'
import { BestDeals } from '../../Components/BestDeals/BestDeals'
import { Product } from '../../Features/Product/Product'
import { useGetProductsQuery } from '../../Api'
import { useDebounce } from '../../Hooks/useDebounce'
import { Pagination } from 'antd'
import { Sort } from '../../Components/Sort/Sort'
import s from './Home.module.scss'

export const Home = () => {
    const [pagination, setPagination] = useState(1)
    const [updateFilters, setUpdateFilters] = useState()
    const [inputValue, setInputValue] = useState('')
    const [sortPrice, setSortPrice] = useState('asc')
    const debouncedValue = useDebounce(inputValue, 800)
    const { data: ProductData = [] } = useGetProductsQuery({
        updateFilters,
        inputValue: debouncedValue,
        pagination,
        sortPrice
    })

console.log(sortPrice)
    return (
        <div className={s.wrapper}>
            <div className={s.home}>
                <div className={s.locDeal}>
                    <Location />
                    <BestDeals
                        sortPrice={sortPrice}
                        setSortPrice={setSortPrice}
                    />
                </div>
                <div className={s.searchSort}>
                    <SearchBar
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                    />
                    <Sort setUpdateFilters={setUpdateFilters} />
                </div>
            </div>
            <div className={s.paginationContainer}>
                <Pagination
                    current={pagination}
                    onChange={(page: number) => setPagination(page)}
                    total={30}
                />
            </div>
            <div className={s.product}>
                {ProductData.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
