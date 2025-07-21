import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useGetProductsQuery } from '../store/api/apiSlice'

export default function useCategory() {
    const { id } = useParams()
    const { list } = useSelector(({ categories }) => categories)

    const defaultValues = {
        title: '',
        price_min: 0,
        prict_max: 0,
    }

    const defaultParams = {
        categoryId: id,
        ...defaultValues,
    }

    const [values, setValues] = useState(defaultValues)
    const [cat, setCat] = useState('')
    const [params, setParams] = useState(defaultParams)

    useEffect(() => {
        if (!id) return

        setParams({ ...defaultParams, categoryId: id })
    }, [id])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (!id || !list) return

        const { name } = list.find((item) => item.id === id * 1)

        setCat(name)
    }, [list, id])

    const { data, isLoading, isSuccess } = useGetProductsQuery(params)

    const hangleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
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
