import apiClient from "@/interceptors/interceptors-auth"


const BASE_URL = `${import.meta.env.VITE_BASE_URL}/users`

class UserService {

  async getMy() {
    try {
      const response = await apiClient.get(`${BASE_URL}/me`)
      return response.data
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
	
}}}

const userService = new UserService()

export default userService
