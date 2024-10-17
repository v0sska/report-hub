import type { ResCustomerTypes } from '@/components/types/interfaces/customer/res-customer-types'
import { Clock2, FolderOpenDot, HandCoins, SquareUserRound, BriefcaseBusinessIcon, ContactRound } from 'lucide-react'
import type React from 'react'
import assignService from '@/api/assignService'
import { useEffect, useState } from 'react'
import developerService from '@/api/developerService'
import salesService from '@/api/salesService'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

const formSchema = z.object({
	developerId: z.string(),
})

interface MainCustomerInfoProps {
	customer: ResCustomerTypes
}

interface Developer {
  id: string;
  name: string;
}

const MainCustomerInfo: React.FC<MainCustomerInfoProps> = ({ customer }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	const [developer, setDeveloper] = useState('');
	const [assigned, setAssigned] = useState(true);
	const [developers, setDevelopers] = useState<Developer[]>([]);

	const fetchAssignedDeveloper = async () => {
		const data = await assignService.findAssignByCustomer(customer.id);

		if (data.data.length === 1 && data.data.length !== 0) {
			setAssigned(true);
			return data.data[0].developerId;
		} else {
			setAssigned(false);
		}
		return data.data;
	};

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetchAssignedDeveloper();
			if (response) {
				const dev = await developerService.findById(response);
				setDeveloper(dev.data.name);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchDevelopers = async () => {
			if (!assigned) {
				const response = await developerService.findAll();
				setDevelopers(response.data);
			}
		};

		fetchDevelopers();
	}, [assigned]);

	const handleDeveloperSelection = (developerId: string) => {
		const selectedDeveloper = developers.find(dev => dev.id === developerId);
		if (selectedDeveloper) {
			setDeveloper(selectedDeveloper.name);
			setAssigned(true);
			console.log(salesService.assignDeveloper(customer.id, developerId), 'aslkmdalsmlakdsm');
		}
	};

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
				<p className='flex items-center gap-2'>
					<ContactRound />
					<span className='font-extrabold'>Developer:</span> 
					<span className='font-extrabold'> 
						{assigned ? developer : 
							<Form {...form}>
								<form>
									<FormField
										control={form.control}
										name='developerId'
										render={({ field }) => (
											<FormItem className="flex items-center">
												<Select
													onValueChange={val => {
														field.onChange(val);
														handleDeveloperSelection(val); // Викликаємо функцію для вибору
													}}
													value={field.value}
												>
													<FormControl className='w-auto'>
														<SelectTrigger className='bg-brown rounded-md p-1 min-w-[100px]'>
															<SelectValue placeholder='Developer' />
														</SelectTrigger>
													</FormControl>
													<SelectContent className='max-h-[300px] overflow-y-auto bg-border rounded-md p-2 gap-2'>
														{developers.length === 0 ? (
															<p className='w-[85vw] text-center'>No developers found</p>
														) : (
															developers.map(developer => (
																<SelectItem className='w-[85vw] text-center' value={developer.id} key={developer.id}>
																	{developer.name}
																</SelectItem>
															))
														)}
													</SelectContent>
												</Select>
												<FormMessage className='flex justify-center text-red-900' />
											</FormItem>
										)}
									/>
								</form>
							</Form>
						}
					</span>
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