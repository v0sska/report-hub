export interface CreateCustomerTypes {
	name: string
	nameProject: string
	rate: string | number
	trackInWeek: string | number
	accountId?: string
	isOnUpwork?: boolean
}
