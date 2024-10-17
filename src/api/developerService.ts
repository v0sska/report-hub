
import type { CreateDeveloperTypes } from '@/components/types/interfaces/dev/create-dev-types'
import type { ResDeveloperTypes } from '@/components/types/interfaces/dev/res-dev'
import apiClient from '@/interceptors/interceptors-auth'
import userService from './userService'

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/developers`

class DeveloperService {
	async create(body: CreateDeveloperTypes): Promise<ResDeveloperTypes> {
		try {
			const data = await userService.getMy();

			const response = await apiClient.post(`${BASE_URL}`, {
				...body,
				userId: data.data.id,
			});
			return response.data
		} catch (error) {
			console.error('Error creating developer:', error)
			throw new Error('Unable to create developer')
		}
	}

	async findById(id: string) {
		try {
			const response = await apiClient.get(`${BASE_URL}/${id}`)
			return response.data
		} catch (error) {
			console.error('Error fetching developer by ID:', error)
			return null
		}
	}

	async findAll() {
		try {
			const response = await apiClient.get(`${BASE_URL}`)
			return response.data
		} catch (error) {
			console.error('Error fetching all developers:', error)
			return null
		}
	}

}

const developerService = new DeveloperService()

export default developerService
