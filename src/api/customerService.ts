import type { CreateCustomerTypes } from '@/components/types/interfaces/customer/create-customer-types'
import type { ResCustomerTypes } from '@/components/types/interfaces/customer/res-customer-types'
import apiClient from '@/interceptors/interceptors-auth'

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/customers`

class CustomerService {
	async create(body: CreateCustomerTypes): Promise<ResCustomerTypes> {
		body.rate = +body.rate
		body.trackInWeek = +body.trackInWeek

		try {
			const response = await apiClient.post(`${BASE_URL}`, body)
			return response.data
		} catch (error) {
			console.error('Error creating customer:', error)
			throw new Error('Unable to create customer')
		}
	}

	async getAll(): Promise<ResCustomerTypes[] | any> {
		try {
			const response = await apiClient.get(`${BASE_URL}`)
			return response.data
		} catch (error) {
			console.error('Error fetching customers:', error)
			throw new Error('Unable to fetch customers')
		}
	}

	async getById(id: string): Promise<ResCustomerTypes> {
		try {
			const data = await apiClient.get(`${BASE_URL}/${id}`)
			return data.data.data
		} catch (error) {
			console.error('Error fetching customer by ID:', error)
			throw new Error('Unable to fetch customer by ID')
		}
	}
}

const customerService = new CustomerService()

export default customerService
