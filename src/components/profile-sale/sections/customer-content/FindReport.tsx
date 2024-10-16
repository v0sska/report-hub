import type React from 'react'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import reportService from '@/api/reportService'
import type { ReportType } from '@/components/types/interfaces/report/report-types'
import { useParams } from 'react-router-dom'
import CardReportForCustomer from './CardReportForCustomer'

const FindReport: React.FC = () => {
	const { id } = useParams()

	const [selectedDate, setSelectedDate] = useState(() => {
		const today = new Date()
		return today.toISOString().split('T')[0]
	})

	const [report, setReport] = useState<ReportType | null>(null)

	const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const date = e.target.value;
		setSelectedDate(date);
		setReport(null);
		if (date) {
			await findReportByDate(date)
		}
	}

	const findReportByDate = async (date: string) => {
		try {
			if (!id) return
			const fetchedReport = await reportService.getByDate(date, id)
			if (fetchedReport) {
				setReport(fetchedReport)
			} else {
				setReport(null);
			}
		} catch (error) {
			console.error('Error fetching report:', error)
			setReport(null);
		}
	}

	// Call the function on component mount to get reports by the selected date
	useEffect(() => {
		findReportByDate(selectedDate)
	}, [selectedDate])

	return (
		<div className='flex flex-col gap-2'>
			<div className='flex justify-between items-center mt-2 pt-5 border-t-2 border-brown'>
				<p>Find a report by date</p>
				<Input
					type='date'
					className='w-fit'
					value={selectedDate}
					onChange={handleDateChange}
				/>
			</div>
			<div>
				{report ? ( 
					<CardReportForCustomer key={report.id} {...report} />
				) : (
					<div className='w-full text-center pt-4'>
						No report found
					</div>
				)}
			</div>
		</div>
	)
}

export default FindReport


