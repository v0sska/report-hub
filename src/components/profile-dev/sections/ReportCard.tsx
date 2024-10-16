import type { ReportType } from '@/components/types/interfaces/report/report-types'
import EditReport from './EditReport'
import type React from 'react'

const ReportCard: React.FC<ReportType> = ({
	startWork,
	endWork,
	track,
	date,
	report,
	id,
}) => {
	return (
		<div className='bg-cardColor rounded-lg justify-around flex gap-2 py-2'>
			<div className='ml-2 py-2 pr-4 flex flex-col justify-center items-center border-r-2 border-brown'>
				<p>Track</p>
				<p className='text-[20px]'>{track}</p>
			</div>
			<div className='p-2 flex flex-col justify-between'>
				<p>
					Work time: {startWork} - {endWork}
				</p>
				<p>Date: {date}</p>
			</div>
			<EditReport startWork={startWork} endWork={endWork} track={Number(track)} report={report} id={id}/>
		</div>
	)
}

export default ReportCard
