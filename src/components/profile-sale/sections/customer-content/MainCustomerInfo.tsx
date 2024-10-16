import type { ResCustomerTypes } from '@/components/types/interfaces/customer/res-customer-types'
import { Clock2, FolderOpenDot, HandCoins, SquareUserRound } from 'lucide-react'
import type React from 'react'
interface MainCustomerInfoProps {
	customer: ResCustomerTypes
}
const MainCustomerInfo: React.FC<MainCustomerInfoProps> = ({ customer }) => {
	return (
		<div className='flex gap-2 my-5 border-b-2 border-brown pb-2'>
			<div className='space-y-2 pr-2 border-r-2 border-brown w-[65%]'>
				<p>
					<SquareUserRound />
					Name : <span className='font-extrabold'>{customer?.name}</span>
				</p>
				<p>
					<FolderOpenDot />
					Project name :{' '}
					<span className='font-extrabold'>{customer?.nameProject}</span>
				</p>
			</div>
			<div className='space-y-2'>
				<p>
					<HandCoins />
					Rate: {customer?.rate}
				</p>

				<p>
					<Clock2 />
					Track: {customer?.trackInWeek}
				</p>
			</div>
		</div>
	)
}

export default MainCustomerInfo
