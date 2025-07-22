export interface Product {
    id: number
    title: string
    price: number
    name: string
    description: string
    category: {
        id: number
        name: string
        image: string
    }
    images: string[]
}

export interface User {
    id?: number
    name: string
    email: string
    avatar: string
    password: string
}

export interface UserLogin {
    email: string
    password: string
}

export interface CartItem {
    id: string
    quantity: number
    images: string
    title: string
    price: number
    name?: string
}

export interface FavItem {
    id: string
    fav: boolean
    images: string
    title: string
    price: string
}

export interface Category {
    id: number
    name: string
    image: string
}

export interface IRoutes {
    page: React.ReactNode
    url: string
    burger?: boolean
    text?: string
    img?: string
}
