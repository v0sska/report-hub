import type React from 'react'
import ReportCard from './ReportCard'
import { useState, useEffect } from 'react'
import reportService from '@/api/reportService'

const ListOfReports: React.FC = () => {
	const [reports, setReports] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const reportsPerPage = 5; 

	const fetchReports = async () => {
		const data = await reportService.getByDeveloperId();
		if (data) {
			setReports(data);
		}
	}

	useEffect(() => {
		fetchReports();
	}, []);

	const indexOfLastReport = currentPage * reportsPerPage;
	const indexOfFirstReport = indexOfLastReport - reportsPerPage;
	const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

	const totalPages = Math.ceil(reports.length / reportsPerPage);

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<div>
			{reports.length > 0 ? (
				<div className='flex flex-col gap-2'>
					{currentReports.map(item => (
						<ReportCard key={item.id} {...item} />
					))}

					<div className="flex justify-between items-center mt-4">
						<div>
							{currentPage > 1 && (
								<button
									onClick={handlePrevPage}
									className='bg-gray-300 text-black px-4 py-2 rounded-lg'
								>
									Previous
								</button>
							)}
						</div>

						<div>
							{currentPage < totalPages && (
								<button
									onClick={handleNextPage}
									className='bg-gray-300 text-black px-4 py-2 rounded-lg'
								>
									Next
								</button>
							)}
						</div>
					</div>
				</div>
			) : (
				<div className='w-full text-center'>
					You do not have any reports yet 💩
				</div>
			)}
		</div>
	)
}

export default ListOfReports;