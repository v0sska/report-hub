import type { ResCustomerTypes } from '@/components/types/interfaces/customer/res-customer-types'
import { Clock2, FolderOpenDot, HandCoins, SquareUserRound, BriefcaseBusinessIcon, ContactRound } from 'lucide-react'
import type React from 'react'
import assignService from '@/api/assignService'
import { useEffect, useState } from 'react'
import developerService from '@/api/developerService'
interface MainCustomerInfoProps {
	customer: ResCustomerTypes
}
const MainCustomerInfo: React.FC<MainCustomerInfoProps> = ({ customer }) => {

	const [developer, setDeveloper] = useState('');

	const fetchAssignedDeveloper = async() => {
		const data = await assignService.findAssignByCustomer(customer.id);

		if(data.data.length === 1 && data.data.length !== 0) {
			return data.data[0].developerId;
		} 
		else {
			setDeveloper('Not assigned');
		}
		return data.data;
	}

	fetchAssignedDeveloper();

	useEffect(() => {
	const fetchData = async () => {
		const response = await fetchAssignedDeveloper();
		const dev = await developerService.findById(response);
		
		setDeveloper(dev.data.name);
	};

	fetchData();
}, []);

	const upWork = customer.isOnUpwork ? 'yes' : 'no';
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
				<p>
					<ContactRound />
					Developer: <span className='font-extrabold'> {developer} </span>
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

				<p>
					<BriefcaseBusinessIcon />
					UpWork: {upWork}
				</p>
			</div>
		</div>
	)
}

export default MainCustomerInfo
