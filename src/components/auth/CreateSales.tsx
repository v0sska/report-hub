'use client'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'

import salesService from '@/api/salesService'
const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
	timeJoin: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
})

export function CreateSales() {
	const navigator = useNavigate()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const result = await salesService.create(values)
		if (result) {
			navigator('/profile-sale')
		}
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-5'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='flex justify-center'>Full name</FormLabel>
							<FormControl>
								<Input
									placeholder='Rayan Gosling'
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
					name='timeJoin'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='flex justify-center'>
								Time join in team
							</FormLabel>
							<FormControl>
								<Input type='date' className='pl-[35%]' {...field} />
							</FormControl>
							<FormMessage className='text-red-900' />
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full bg-brown'>
					Submit
				</Button>
			</form>
		</Form>
	)
}
