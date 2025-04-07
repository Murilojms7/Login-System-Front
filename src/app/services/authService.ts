import api from "@/lib/axios"

type RegisterData = {
    name: string
    email: string
    password: string
}

type LoginData = {
    email: string,
    password: string
}

export async function register(data: RegisterData) {
    const response = await api.post("/auth/register", data)
    return response.data
}

export async function login(data: LoginData) {
    const response = await api.post("/auth/login", data)
    return response.data
}