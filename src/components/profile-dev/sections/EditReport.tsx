import type React from 'react';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { Pencil } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import reportService from '../../../api/reportService';

const formSchema = z.object({
	startWork: z.string().min(2, {
		message: 'End time is required',
	}),
	endWork: z.string().min(2, {
		message: 'End time is required',
	}),
	customerId: z.string(),
	track: z.union([z.string(), z.number()]).refine(val => {
		if (typeof val === 'string') {
			return val.trim().length > 0
		}
		return val > 0
	}, {
		message: 'Track is required and must be greater than 0',
	}),
	report: z.string().min(10, {
		message: 'Min 10 characters',
	}),
})

interface EditReportProps {
	id?: string;
	startWork: string;
	endWork: string;
	track: number | string;
	report: string;
}

const EditReport: React.FC<EditReportProps> = ({
	startWork,
	endWork,
	track,
	report,
	id
}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: { startWork, endWork, track, report },
		resolver: zodResolver(formSchema),
	})

	async function onSubmit() {

	const startWork = form.getValues('startWork');
	const endWork = form.getValues('endWork');
	const track = form.getValues('track');
	const report = form.getValues('report');

	const { data, error } = await reportService.update(
		id as string,
		startWork,
		endWork,
		Number(track),
		report
	);

	window.location.reload();

	if (error) {
			console.error('Error creating report:', error)
	} else {
			console.log('Report created successfully:', data)
	}
}


	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Pencil className='w-5 m-2 cursor-pointer' />
			</DrawerTrigger>
			<DrawerContent className=' bg-main h-fit'>
				<DrawerHeader>
					<DrawerTitle className='text-[#4f4c45]'>
						Edit the report form.
					</DrawerTitle>
					<DrawerDescription className='text-brown'>
						Make sure everything is correct
					</DrawerDescription>
				</DrawerHeader>
				<Form {...form}>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							onSubmit();
						}}
						>
						{/* <form onSubmit={form.handleSubmit(onSubmit)}> */}
						<div className='px-5 flex flex-col gap-4'>
							<div className='grid grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name='startWork'
									render={({ field }) => (
										<FormItem className=' items-center flex flex-col'>
											<FormLabel>Start work</FormLabel>
											<FormControl>
												<Input
													className='justify-center'
													type='time'
													{...field}
												/>
											</FormControl>
											<FormMessage className='text-red-900' />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='endWork'
									render={({ field }) => (
										<FormItem className=' items-center flex flex-col'>
											<FormLabel>End work</FormLabel>
											<FormControl>
												<Input
													className='justify-center'
													type='time'
													{...field}
												/>
											</FormControl>
											<FormMessage className='text-red-900' />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name='track'
								render={({ field }) => (
									<FormItem className='items-center flex flex-col'>
										<FormLabel>Track time</FormLabel>
										<FormControl>
											<Input className='text-center' type='number' {...field} />
										</FormControl>
										<FormMessage className='text-red-900' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='report'
								render={({ field }) => (
									<FormItem className='items-center flex flex-col'>
										<FormLabel>Report</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Describe the tasks you worked on today'
												className='resize-none h-[120px]'
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-red-900' />
									</FormItem>
								)}
							/>
						</div>

						<DrawerFooter>
							<Button type='submit' className='bg-brown'>
								Submit
							</Button>
							<DrawerClose>
								<Button variant='outline' type='button'>
									Cancel
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</form>
				</Form>
			</DrawerContent>
		</Drawer>
	)
}

export default EditReport
