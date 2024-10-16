'use client'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StackEnum } from '../types/enums/stack-enum'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import developerService from '@/api/developerService'
import { useNavigate } from 'react-router-dom'

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	stack: z.nativeEnum(StackEnum, {
		errorMap: () => ({ message: 'Select a valid stack' }),
	}),
	telegram: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	timeJoin: z.string().min(2, {
		message: '',
	}),
})

export function CreateDeveloper() {
	const navigator = useNavigate()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const result = await developerService.create(values)
		if (result) {
			navigator('/profile-dev')
		}
	}

	const statuses = Object.values(StackEnum)

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='flex justify-center mt-5'>
								Full name
							</FormLabel>
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
				<div className='grid grid-cols-2 gap-5'>
					<FormField
						control={form.control}
						name='stack'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='flex justify-center'>Stack</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select stack' />
										</SelectTrigger>
									</FormControl>
									<SelectContent className='bg-main'>
										{statuses.map(status => (
											<SelectItem value={status} key={status}>
												{status}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='telegram'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='flex justify-center'>Telegram</FormLabel>
								<FormControl>
									<Input
										placeholder='@example'
										className='text-center'
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
					name='timeJoin'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='flex justify-center'>Time Join</FormLabel>
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
