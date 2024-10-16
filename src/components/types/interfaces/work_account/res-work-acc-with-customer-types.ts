import type { ResCustomerTypes } from '../customer/res-customer-types'
import type { ResWorkAccountTypes } from './res-work-account'

export interface ResWorkAccWithCustomerTypes extends ResWorkAccountTypes {
	customer: ResCustomerTypes[]
}
