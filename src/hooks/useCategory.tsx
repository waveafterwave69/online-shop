import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetProductsQuery } from '../store/api/apiSlice'
import { CartItem } from '../types'

interface FilterValues {
    title: string
    price_min: number
    prict_max: number
}

interface FilterParams extends FilterValues {
    categoryId: string | undefined
}

interface UseCategoryReturn {
    defaultParams: FilterParams
    hangleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: React.FormEvent) => void
    cat: string
    values: FilterValues
    isLoading: boolean
    isSuccess: boolean
    data: any
    setParams: any
    setValues: any
}

const useCategory = (): UseCategoryReturn => {
    const { id } = useParams()
    const { list } = useSelector(({ categories }: any) => categories)

    const defaultValues: FilterValues = {
        title: '',
        price_min: 0,
        prict_max: 0,
    }

    const defaultParams: FilterParams = {
        categoryId: id,
        ...defaultValues,
    }

    const [values, setValues] = useState<FilterValues>(defaultValues)
    const [cat, setCat] = useState<string>('')
    const [params, setParams] = useState<FilterParams>(defaultParams)

    useEffect(() => {
        if (!id) return

        setParams({ ...defaultParams, categoryId: id })
    }, [id])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (!id || !list) return

        const { name } = list.find((item: CartItem) => item.id === id * 1)

        setCat(name)
    }, [list, id])

    const { data, isLoading, isSuccess } = useGetProductsQuery(params)

    const hangleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        setParams({ ...params, ...values })
    }

    return {
        defaultParams,
        hangleChange,
        handleSubmit,
        cat,
        values,
        isLoading,
        isSuccess,
        data,
        setParams,
        setValues,
    }
}

export default useCategory
