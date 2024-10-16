
import type { CreateSalesTypes } from '@/components/types/interfaces/sale/create-sales-types'
import type { ResSalesTypes } from '@/components/types/interfaces/sale/res-sales'
import apiClient from '@/interceptors/interceptors-auth'
import userService from './userService'

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/sales`

class SalesService {
	async create(body: CreateSalesTypes): Promise<ResSalesTypes> {
		try {
			const data = await userService.getMy()
			body.userId = data.data.id
			const response = await apiClient.post(BASE_URL, body)
			return response.data
		} catch (error) {
			console.error('Error creating sale:', error)
			throw new Error('Unable to create sale')
		}
	}

}

const salesService = new SalesService()

export default salesService
