import type React from 'react'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import customerService from '@/api/customerService'

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'End time is required',
	}),
	nameProject: z.string().min(2, {
		message: 'Name project is required',
	}),
	rate: z.string().min(2, {
		message: 'End time is required',
	}),
	trackInWeek: z.string().min(2, {
		message: 'End time is required',
	}),
})

interface AddCustomerTypes {
	accountId: string
}
const AddCustomer: React.FC<AddCustomerTypes> = ({ accountId }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const newValues = { ...values, accountId: accountId }
		await customerService.create(newValues)
		window.location.reload()
	}

	return (
		<Drawer>
			<DrawerTrigger className='py-1 px-2 rounded-lg  flex gap-2 bg-brown w-fit '>
				Add customer
			</DrawerTrigger>
			<DrawerContent className=' bg-main h-fit'>
				<DrawerHeader>
					<DrawerTitle className='text-[#4f4c45]'>
						Fill in the fields below for the customer 👇 .
					</DrawerTitle>
				</DrawerHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='px-5 flex flex-col gap-4'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem className='items-center flex flex-col'>
										<FormLabel>Name customer</FormLabel>
										<FormControl>
											<Input
												className='text-center'
												placeholder='Name Example'
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-red-900' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='nameProject'
								render={({ field }) => (
									<FormItem className='items-center flex flex-col'>
										<FormLabel>Name project</FormLabel>
										<FormControl>
											<Input
												className='text-center'
												placeholder='Name Example'
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-red-900' />
									</FormItem>
								)}
							/>
							<div className='grid grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name='rate'
									render={({ field }) => (
										<FormItem className='items-center flex flex-col'>
											<FormLabel>Rate</FormLabel>
											<FormControl>
												<Input
													type='number'
													className='text-center'
													{...field}
												/>
											</FormControl>
											<FormMessage className='text-red-900' />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='trackInWeek'
									render={({ field }) => (
										<FormItem className='items-center flex flex-col'>
											<FormLabel>Track in week</FormLabel>
											<FormControl>
												<Input
													className='text-center'
													type='number'
													{...field}
												/>
											</FormControl>
											<FormMessage className='text-red-900' />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<DrawerFooter>
							<DrawerClose className='flex flex-col gap-2'>
								<Button type='submit' className='bg-brown w-full'>
									Submit
								</Button>
								<Button variant='outline' type='button' className='w-full'>
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

export default AddCustomer
