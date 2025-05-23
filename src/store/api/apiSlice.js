import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.escuelajs.co/api/v1',
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProduct: builder.query({
            query: ({ id }) => `/products/${id}`,
        }),
        getProducts: builder.query({
            query: (params) => {
                let urlWithParams = `/products`

                Object.entries(params).forEach(([key, value], i) => {
                    const sign = !i ? '?' : '&'
                    urlWithParams += `${sign}${key}=${value}`
                })

                return urlWithParams
            },
        }),
    }),
})

export const { useGetProductQuery, useGetProductsQuery } = apiSlice
