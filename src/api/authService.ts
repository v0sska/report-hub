import type { AuthTypesRes } from '@/components/types/interfaces/auth/auth-types'
import apiClient from '@/interceptors/interceptors-auth'


const BASE_URL = `${import.meta.env.VITE_BASE_URL}/auth`

class AuthService {
  async getAuthUser(token: string) {
    try {
      const response = await apiClient.get<AuthTypesRes>(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  }

  async register(email: string, password: string) {
    try {
      const response = await apiClient.post(`${BASE_URL}/register`, {
        email,
        password,
      })
      return response.data
    } catch (error) {
      console.error('Unexpected error:', error)
      return { success: false, message: 'An unexpected error occurred' }
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await apiClient.post(`${BASE_URL}/login`, {
        email,
        password,
      })
      return response.data
    } catch (error) {
      console.error('Unexpected error:', error)
      return { success: false, message: 'An unexpected error occurred' }
    }
  }
}

const authService = new AuthService()

export default authService
