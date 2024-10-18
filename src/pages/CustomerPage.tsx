import customerService from '@/api/customerService'
import reportService from '@/api/reportService'

import ChartCustomer from '@/components/profile-sale/sections/customer-content/ChartCustomer'
import FindReport from '@/components/profile-sale/sections/customer-content/FindReport'
import MainCustomerInfo from '@/components/profile-sale/sections/customer-content/MainCustomerInfo'
import type { ResCustomerTypes } from '@/components/types/interfaces/customer/res-customer-types'
import type { ReportType } from '@/components/types/interfaces/report/report-types'
import { Button } from '@/components/ui/button'
import { Undo2 } from 'lucide-react'

import type React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const CustomerPage: React.FC = () => {
	const { id } = useParams()

	const [customer, setCustomer] = useState<ResCustomerTypes | null>(null)
	const [reports, setReports] = useState<ReportType[] | null>(null)
	const [rate, setRate] = useState(0);
	const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
		getStartOfWeek(new Date())
	)

	function getStartOfWeek(date: Date): Date {
		const day = date.getDay()
		const diff = date.getDate() - day + (day === 0 ? -6 : 1)
		return new Date(date.setDate(diff))
	}

	const calcRate = async () => {
	if (reports && reports.length > 0 && customer) {
		let totalRate = reports.reduce((acc, report) => {
			return acc + (+report.track * +customer.rate);
		}, 0);

		if (customer.isOnUpwork) {
			totalRate -= totalRate * 0.1;
		}
			setRate(totalRate);
		} else {
			setRate(0);
		}
	};

	useEffect(() => {
		async function fetchData() {
			if (!id) return
			try {
				const customerData = await customerService.getById(id)
				setCustomer(customerData)

				const startDate = currentWeekStart.toISOString().split('T')[0]
				const endDate = getEndOfWeek(currentWeekStart)
					.toISOString()
					.split('T')[0]

				const reportData = await reportService.getByIdCustomer(
					id,
					startDate,
					endDate
				)
				setReports(reportData)
			} catch (error) {
				console.error('Помилка завантаження даних:', error)
			}
		}

		fetchData();

	}, [id, currentWeekStart])

	useEffect(() => {
		calcRate();
	}, [reports, customer]);

	function getEndOfWeek(startOfWeek: Date): Date {
		const endOfWeek = new Date(startOfWeek)
		endOfWeek.setDate(startOfWeek.getDate() + 6)
		return endOfWeek
	}

	const goToNextWeek = () => {
		const nextWeekStart = new Date(currentWeekStart)
		nextWeekStart.setDate(currentWeekStart.getDate() + 7)
		setCurrentWeekStart(nextWeekStart)
	}

	const goToPreviousWeek = () => {
		const prevWeekStart = new Date(currentWeekStart)
		prevWeekStart.setDate(currentWeekStart.getDate() - 7)
		setCurrentWeekStart(prevWeekStart)
	}

	return (
		<div className='p-5'>
			<div className='flex justify-between items-end'>
				<p>Customer</p>
				<Link to={'/profile-sale'}>
					<Button className='items-center flex gap-2'>
						<Undo2 />
						Back
					</Button>
				</Link>
			</div>
			{customer && <MainCustomerInfo customer={customer} />}
			<h2>Reports for the week</h2>

			<p>
				Week {currentWeekStart.toLocaleDateString()} -{' '}
				{getEndOfWeek(currentWeekStart).toLocaleDateString()}
			</p>
			<p>Sallary for this week: {rate}$</p>

			{reports ? <ChartCustomer reports={reports} /> : <p>Loading ...</p>}
			<div className='w-full flex justify-between mt-10'>
				<Button onClick={goToPreviousWeek}>Previous</Button>
				<Button onClick={goToNextWeek}>Next</Button>
			</div>

			<FindReport/>
		</div>
	)
}

export default CustomerPage

