import type { ReportType } from '@/components/types/interfaces/report/report-types'
import apiClient from '@/interceptors/interceptors-auth'
import userService from './userService'

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/reports`

class ReportService {
	async create(body: ReportType) {
		try {
			console.log(body, 'kladfjnadflkanflafnjkfszNkfjdsGJKNO;sdbkhjgnds k.jnwefghilknefailb ')
			const data = await userService.getMy()

			
			const response = await apiClient.post(`${BASE_URL}`, {
				...body,
				track: Number(body.track),
				developerId: data.data.developer.id,
			})
			return { data: response.data, error: null }
		} catch (error) {
			console.error('Error creating report:', error)
			return { data: null, error: 'Unable to create report' }
		}
	}

	async getByIdCustomer(
		id: string,
		startDate: string,
		endDate: string
	): Promise<ReportType[]> {
		try {
			const response = await apiClient.get(`${BASE_URL}/dates`, {
				params: {
					customerId: id,
					startDate,
					endDate,
				},
			})
			return response.data.data;
		} catch (error) {
			console.error('Error fetching reports by customer ID:', error)
			return []
		}
	}

	async getByDate(date: string, id: string): Promise<ReportType | null> {
		try {
			const response = await apiClient.get(`${BASE_URL}/date`, {
				params: {
					date,
					customerId: id,
				},
			})
			return response.data.data;
		} catch (error) {
			console.error('Error fetching report by date and customer ID:', error)
			return null
		}
	}

	async getByDeveloperId(): Promise<ReportType[] | null> {
		try {
			const data = await userService.getMy()

			const response = await apiClient.get(`${BASE_URL}/developer/${data.data.developer.id}`);

			return response.data.data
		} catch(error) {
			console.error('Error fetching report by date and customer ID:', error)
			return null
		}
	}

	async update(id: string, startWork: string, endWork: string, track: number, report: string) {
		try {
			
			const response = await apiClient.patch(`${BASE_URL}/${id}`, {
				startWork: startWork,
				endWork: endWork,
				track: track,
				report: report,
			})
			return response.data
		} catch (error) {
			console.error('Error updating report:', error)
			return null
		}
	}
}

const reportService = new ReportService()

export default reportService
